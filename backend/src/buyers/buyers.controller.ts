import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post()
  create(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyersService.create(createBuyerDto);
  }

  @Get()
  findAll() {
    return this.buyersService.findAll();
  }

  @Get(':phone')
  findOne(@Param('phone') phone: string) {
    return this.buyersService.findOne(phone);
  }
}
