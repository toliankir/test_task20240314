import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.request.dto';
import { UserType } from '../user/types/user.type';
import { GetUser } from '../../decorators/get-token-model.decorator';
import { LoginResponseDto } from './dto/login.response.dto';
import { RefreshResponseDto } from './dto/refresh.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @GetUser() user: UserType,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() data: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh')
  async refresh(@GetUser() user: UserType): Promise<RefreshResponseDto> {
    return this.authService.refreshToken(user);
  }
}
