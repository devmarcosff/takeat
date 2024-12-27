import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepo: typeof Product, // Injeção do modelo
  ) { }

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productRepo.findOne({ where: { name: createProductDto.name } });
    if (existingProduct) throw new ConflictException('Este produto já está cadastrado')


    if (!existingProduct) {
      await this.productRepo.create({
        name: createProductDto.name,
        description: createProductDto.description,
        value: createProductDto.value,
        restaurant_id: createProductDto.restaurant_id
      });

      return 'Produto cadastrado com sucesso';
    }
  }

  async findAll() {
    const allProducts = await this.productRepo.findAll({
      where: {
        canceledAt: null,
      }
    });

    return allProducts;
  }

  async findAllDisabled() {
    const allProducts = await this.productRepo.findAll({
      where: {
        canceledAt: { [Op.ne]: null },
      }
    });

    return allProducts;
  }

  async findOne(id: string) {
    const existingProduct = await this.productRepo.findOne({
      where: { id }
    });

    if (!existingProduct) {
      throw new NotFoundException(`Produto com o id ${id} não encontrado.`);
    }

    return existingProduct;
  }

  async update(id: string) {
    const product = await this.productRepo.findByPk(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    if (product.canceledAt != null) {
      await product.update({
        canceledAt: null,
      });

       return `O produto "${product.name}" foi reativado com sucesso`
    }

    return `O produto já se encontra ativo`
  }

  async remove(id: string): Promise<string> {
    const existingProduct = await this.productRepo.findByPk(id);

    if (!existingProduct) {
      throw new NotFoundException(`Não encontramos este produto`);
    }

    if (!existingProduct.canceledAt) {
      await existingProduct.update({
        canceledAt: new Date(),
      });

      return `O produto ${existingProduct.name} foi desativado com sucesso.`;
    }
    return `Produto já está desativado`;
  }
}
