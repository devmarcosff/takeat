import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    const { identifier, password } = createAuthDto;

    return this.authService.login(identifier, password);
  }

  @Patch('logout/:id')
  async logout(@Param('id') id: string) {
    await this.authService.logout(id);
    return { message: 'Logout realizado com sucesso' };
  }
}
