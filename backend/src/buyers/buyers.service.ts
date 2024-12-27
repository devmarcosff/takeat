import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Buyer } from './entities/buyer.entity';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class BuyersService {
  constructor(
    @InjectModel(Buyer) private buyerRepo: typeof Buyer, // Injeção do modelo
  ) { }

  async create(createBuyerDto: CreateBuyerDto) {
    const existingBuyer = await this.buyerRepo.findOne({ where: { phone: createBuyerDto.phone } });
    if (existingBuyer) throw new ConflictException('Este cliente já está cadastrado')


    if (!existingBuyer) {
      await this.buyerRepo.create({
        name: createBuyerDto.name,
        phone: createBuyerDto.phone
      });

      return 'Cliente cadastrado com sucesso';
    }
  }

  async findAll() {
    const allProducts = await this.buyerRepo.findAll({
      include: [Order]
    });

    return allProducts;
  }

  async findOne(phone: string) {
    const existingBuyer = await this.buyerRepo.findOne({
      where: { phone }
    });

    if (!existingBuyer) {
      throw new NotFoundException(`Cliente com o telefone ${phone} não encontrado.`);
    }

    return existingBuyer;
  }
}
