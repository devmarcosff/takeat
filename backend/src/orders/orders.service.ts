import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Buyer } from 'src/buyers/entities/buyer.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private readonly orderRepo: typeof Order,
    @InjectModel(Product) private readonly productRepo: typeof Product,
    @InjectModel(Buyer) private readonly buyerRepo: typeof Buyer,
    @InjectModel(Restaurant) private readonly restaurantRepo: typeof Restaurant,
  ) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { buyerPhone, products } = createOrderDto;

    // Verificar ou criar o comprador
    let buyer = await this.buyerRepo.findOne({ where: { phone: buyerPhone } });
    if (!buyer) {
      buyer = await this.buyerRepo.create({ phone: buyerPhone });
    }

    let totalPrice = 0;
    let totalServicePrice = 0;

    // Calcular o total de produtos comprados
    const totalAmount = products.reduce((sum, product) => sum + product.amount, 0);

    // Obter o restaurantId do primeiro produto
    let restaurantId: string | null = null;

    const order = await this.orderRepo.create({
      buyerId: buyer.id,
      createdAt: new Date(),
    });

    for (const { id: productId, amount } of products) {
      const product = await this.productRepo.findByPk(productId, {
        include: [{ model: Restaurant }],
      });

      if (!product) {
        throw new NotFoundException(`Produto com ID ${productId} não encontrado.`);
      }

      // Determinar o restaurantId
      if (!restaurantId) {
        restaurantId = product.restaurant.id;
      } else if (restaurantId !== product.restaurant.id) {
        throw new Error(
          'Todos os produtos de um pedido devem pertencer ao mesmo restaurante.'
        );
      }

      // Calcular preços
      const productPrice = amount * product.value;
      totalPrice += productPrice;

      if (product.restaurant.has_service_tax) {
        totalServicePrice += productPrice + productPrice * 0.1;
      } else {
        totalServicePrice += productPrice;
      }

      // Criar a entrada na tabela intermediária
      await this.productRepo.create({
        orderId: order.id,
        productId: product.id,
        amount,
      });
    }

    // Atualizar o pedido com os totais, restaurantId e quantidade total
    await order.update({
      total_price: totalPrice,
      total_service_price: totalServicePrice,
      restaurantId,
      amount: totalAmount
    });

    return order;
  }

  async findAll() {
    const allOrders = await this.orderRepo.findAll({
      include: [Buyer]
    })
    return allOrders;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
