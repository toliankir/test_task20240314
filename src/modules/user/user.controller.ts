import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FindUserRequestDto } from './dto/find-user.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserCreateRequestDto } from './dto/user-create.request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getAllUser(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  public async getUser(
    @Param() params: FindUserRequestDto,
  ): Promise<UserResponseDto | null> {
    return this.userService.getUser(params);
  }

  @Post()
  public async saveUser(
    @Body() body: UserCreateRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.saveUser(body);
  }
}
