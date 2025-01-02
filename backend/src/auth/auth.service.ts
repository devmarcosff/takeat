import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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

  async login(identifier: string, password: string): Promise<any> {
    const user = await this.validateUser(identifier, password);

    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    const { password: _, ...restaurantInfo } = user;

    return {
      ...restaurantInfo,
      token,
    };
  }

}
