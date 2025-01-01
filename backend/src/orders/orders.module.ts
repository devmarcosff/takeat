import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order, OrderProduct } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Buyer } from 'src/buyers/entities/buyer.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, Product, Buyer, Restaurant, OrderProduct])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
