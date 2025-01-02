import { Restaurant } from './entities/restaurant.entity';
import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/entities/product.entity';
import { Op } from 'sequelize';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant) private restaurantRepo: typeof Restaurant,
    @InjectModel(Order) private ordersRepo: typeof Order,
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

  async findOne(where: { id?: string; phone?: string; email?: string }): Promise<Restaurant> {
    if (!where.id && !where.phone && !where.email) {
      throw new BadRequestException('Você deve fornecer o ID, telefone ou email do restaurante.');
    }

    const restaurant = await this.restaurantRepo.findOne({
      where,
      include: [Product],
      attributes: { include: ['password'] },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurante não encontrado.');
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
