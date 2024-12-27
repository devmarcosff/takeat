import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './entities/restaurant.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [SequelizeModule.forFeature([Restaurant, Product, Order])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule { }
