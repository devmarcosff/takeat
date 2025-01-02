import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { AuthGuard } from '@nestjs/passport';

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
    @Query('type') type?: 'id' | 'phone' | 'email',
  ) {
    let result;

    if (type === 'id') {
      result = await this.restaurantsService.findOne({ id: idOrPhone });
    } else if (type === 'phone' || /^[0-9]+$/.test(idOrPhone)) {
      result = await this.restaurantsService.findOne({ phone: idOrPhone });
    } else if (type === 'email' || idOrPhone.includes('@')) {
      result = await this.restaurantsService.findOne({ email: idOrPhone });
    } else { throw new BadRequestException('Identificador inválido. Use um ID, telefone ou email válido.',) }

    return result;
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/products/:id')
  findProductsRestaurant(@Param('id') id: string) {
    return this.restaurantsService.findProductsRestaurant(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/orders/:id')
  findOrdersRestaurant(@Param('id') id: string) {
    return this.restaurantsService.findOrdersRestaurant(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.restaurantsService.update(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
