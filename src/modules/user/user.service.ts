import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './user.entity';
import { FindUserRequestDto } from './dto/find-user.request.dto';
import { UserCreateRequestDto } from './dto/user-create.request.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UserFullType } from './types/user-full.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity) private readonly userEntitis: typeof UserEntity,
  ) {}
  public async getAllUsers(): Promise<UserResponseDto[]> {
    const users: UserEntity[] = await this.userEntitis.findAll();
    return users.map((e) => UserResponseDto.fromUserEntity(e));
  }

  public async getUser(
    params: FindUserRequestDto,
  ): Promise<UserResponseDto | null> {
    const user: UserEntity | null = await this.userEntitis.findOne({
      where: { id: params.userId },
    });
    return user ? UserResponseDto.fromUserEntity(user) : null;
  }

  public async findUserByEmail(email: string): Promise<UserFullType | null> {
    const userEntity: UserEntity | null = await this.userEntitis.findOne({
      where: { email },
    });

    return userEntity
      ? {
          id: userEntity.id,
          email: userEntity.email,
          name: userEntity.name,
          password: userEntity.password,
          phone: userEntity.phone,
          createdAt: new Date(userEntity.createdAt),
          updatedAt: new Date(userEntity.updatedAt),
        }
      : null;
  }

  public async saveUser(
    userData: UserCreateRequestDto,
  ): Promise<UserResponseDto> {
    const existingUser: UserFullType | null = await this.findUserByEmail(
      userData.email,
    );

    if (existingUser) {
      throw new BadRequestException(
        `User with email "${userData.email}" already exist`,
      );
    }

    const hasedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new UserEntity({
      name: userData.name,
      password: hasedPassword,
      email: userData.email,
      phone: userData.phone,
    });

    const savedUser = await newUser.save();
    return UserResponseDto.fromUserEntity(savedUser);
  }
}
