import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCodeDto } from './dto/auth-code.dto';
import { AuthTokenDto } from './dto/auth-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: AuthCodeDto) {
    return this.authService.login(dto.code);
  }

  @Post('login/token')
  async loginWithToken(@Body() dto: AuthTokenDto) {
    return this.authService.loginWithTonke(dto.token);
  }
}
