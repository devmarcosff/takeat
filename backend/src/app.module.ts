import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ProductsModule } from './products/products.module';
import { BuyersModule } from './buyers/buyers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: "ep-raspy-breeze-a5wawphc.us-east-2.aws.neon.tech",
      port: 5432,
      username: "neondb_owner",
      password: "HR9fzxoFDl5h",
      database: "neondb",
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    }),
    RestaurantsModule,
    ProductsModule,
    BuyersModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
