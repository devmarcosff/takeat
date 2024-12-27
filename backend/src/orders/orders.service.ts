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
    const { amount, buyerPhone, product_id } = createOrderDto;

    const product = await this.productRepo.findByPk(product_id, {
      include: [{ model: Restaurant }],
    });
    if (!product) {
      throw new NotFoundException('Não encontramos este produto');
    }

    let buyer = await this.buyerRepo.findOne({ where: { phone: buyerPhone } });
    if (!buyer) {
      buyer = await this.buyerRepo.create({ phone: buyerPhone });
    }

    const totalPrice = amount * product.value;
    const totalServicePrice = product.restaurant.has_service_tax ? totalPrice + totalPrice * 0.1 : totalPrice;

    const order = await this.orderRepo.create({
      amount,
      restaurantId: product.restaurant.id,
      buyerId: buyer.id,
      total_service_price: totalServicePrice,
      total_price: totalPrice,
      productId: product.id,
      createdAt: new Date(),
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
