import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get('disabled')
  findAllDisabled() {
    return this.restaurantsService.findAllDisabled();
  }

  @Get(':idOrPhone')
  async findOne(
    @Param('idOrPhone') idOrPhone: string,
    @Query('type') type?: 'id' | 'phone',
  ) {
    const isPhone = type === 'phone' || /^[0-9]+$/.test(idOrPhone);

    if (isPhone) {
      return this.restaurantsService.findOne(idOrPhone, undefined);
    } else {
      return this.restaurantsService.findOne(undefined, idOrPhone);
    }
  }

  @Get('/products/:id')
  findProductsRestaurant(@Param('id') id: string) {
    return this.restaurantsService.findProductsRestaurant(id);
  }

  @Get('/orders/:id')
  findOrdersRestaurant(@Param('id') id: string) {
    return this.restaurantsService.findOrdersRestaurant(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.restaurantsService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
