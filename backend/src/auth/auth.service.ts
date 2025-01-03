import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly restaurantRepo: RestaurantsService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(identifier: string, pass: string): Promise<any> {
    const where: { phone?: string; email?: string } = {};

    if (/^[0-9]+$/.test(identifier)) {
      where.phone = identifier;
    } else if (identifier.includes('@')) {
      where.email = identifier;
    } else {
      throw new BadRequestException('Identificador inválido. Use um telefone ou email válido.');
    }

    const user = await this.restaurantRepo.findOne(where);

    if (!user.password || !pass) {
      throw new Error('Senha não fornecida ou inválida');
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (isPasswordMatching) {
      const { password, ...result } = user.toJSON();
      return result;
    }

    return null;
  }

  async login(identifier: string, password: string): Promise<{ restaurant: any; accessToken: string }> {
    // Buscar o restaurante com base no identificador (e-mail ou telefone)
    const restaurant = await this.restaurantRepo.findOne({ email: identifier });

    if (!restaurant) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, restaurant.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar o token
    const payload = { id: restaurant.id, username: restaurant.username };
    const accessToken = this.jwtService.sign(payload);

    // Atualizar o status do restaurante para `true`
    await this.restaurantRepo.updateActiveRestaurant(restaurant.id, { status: true });

    // Buscar novamente os dados atualizados do restaurante
    const updatedRestaurant = await this.restaurantRepo.findOne({ id: restaurant.id });

    return { restaurant: updatedRestaurant, accessToken };
  }

  async logout(id: string): Promise<void> {
    const restaurant = await this.restaurantRepo.findByPk(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurante não encontrado');
    }

    // Atualizar o status para false
    await restaurant.update({ status: false });
  }

}
