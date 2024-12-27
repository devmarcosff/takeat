import { Module } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { BuyersController } from './buyers.controller';
import { Buyer } from './entities/buyer.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Buyer])],
  controllers: [BuyersController],
  providers: [BuyersService],
})
export class BuyersModule {}
