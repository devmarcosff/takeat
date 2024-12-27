import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, Restaurant])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
