import { Restaurant } from './entities/restaurant.entity';
import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/entities/product.entity';
import { Op } from 'sequelize';
import { Order } from 'src/orders/entities/order.entity';
import { Buyer } from 'src/buyers/entities/buyer.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant) private restaurantRepo: typeof Restaurant, // Injeção do modelo
    @InjectModel(Order) private ordersRepo: typeof Order, // Injeção do modelo
  ) { }

  async create(createRestaurantDto: CreateRestaurantDto) {
    const existingEmailRestaurant = await this.restaurantRepo.findOne({ where: { email: createRestaurantDto.email } });
    const existingPhoneRestaurant = await this.restaurantRepo.findOne({ where: { phone: createRestaurantDto.phone } });
    if (existingEmailRestaurant || existingPhoneRestaurant) throw new ConflictException('O email ou telefone já está em uso.')

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createRestaurantDto.password, saltRounds);

    const newRestaurant = await this.restaurantRepo.create({
      username: createRestaurantDto.username,
      password: hashedPassword,
      email: createRestaurantDto.email,
      phone: createRestaurantDto.phone,
      address: createRestaurantDto.address,
      has_service_tax: createRestaurantDto.has_service_tax
    });

    newRestaurant.password = undefined;

    return newRestaurant;
  }

  async findAll() {
    const allRestaurants = await this.restaurantRepo.findAll({
      attributes: { exclude: ['password'] },
      where: {
        canceledAt: null,
      },
      include: [{ model: Product }]
    });

    return allRestaurants;
  }

  async findAllDisabled() {
    const allProducts = await this.restaurantRepo.findAll({
      attributes: { exclude: ['password'] },
      where: {
        canceledAt: { [Op.ne]: null },
      }
    });

    return allProducts;
  }

  async findOne(phone?: string, id?: string) {
    if (!phone && !id) {
      throw new BadRequestException('Você deve fornecer o telefone ou o ID do restaurante.');
    }

    const where: any = {};
    if (phone) where.phone = phone;
    if (id) where.id = id;

    const restaurant = await this.restaurantRepo.findOne({
      where,
      include: [Product],
      attributes: { exclude: ['password'] },
    });

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurante ${phone ? `com o telefone ${phone}` : `com o ID ${id}`} não encontrado.`
      );
    }

    return restaurant;
  }

  async findProductsRestaurant(id: string) {
    const existingProduct = await this.restaurantRepo.findOne({
      where: { id },
      include: [Product]
    });

    if (!existingProduct) {
      throw new NotFoundException(`Restaurante com o id ${id} não encontrado.`);
    }

    return existingProduct.products;
  }

  async findOrdersRestaurant(id: string) {
    const existingOrder = await this.restaurantRepo.findOne({
      where: { id },
      include: [Order]
    });

    if (!existingOrder) {
      throw new NotFoundException(`Restaurante com o id ${id} não encontrado.`);
    }

    return existingOrder.orders;
  }

  async update(id: string) {
    const product = await this.restaurantRepo.findByPk(id);

    if (!product) {
      throw new NotFoundException('Restaurante não encontrado');
    }

    if (product.canceledAt) {
      await product.update({
        canceledAt: null,
      });

      return `O restaurante "${product.username}" foi reativado com sucesso`
    }

    return `O restaurante já se encontra ativo`
  }

  async remove(id: string): Promise<string> {
    const restaurant = await this.restaurantRepo.findByPk(id);

    if (!restaurant) {
      throw new NotFoundException(`Não encontramos este produto`);
    }

    if (!restaurant.canceledAt) {
      await restaurant.update({
        canceledAt: new Date(),
      });

      return `O restaurante ${restaurant.username} foi desativado com sucesso.`;
    }
    return `O restaurante ${restaurant.username} já está desativado`;
  }
}
