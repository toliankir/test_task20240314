import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsPositive } from 'class-validator';
import { UserCreateRequestDto } from './user-create.request.dto';
import { UserEntity } from '../user.entity';

export class UserResponseDto extends OmitType(UserCreateRequestDto, [
  'password',
] as const) {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({ example: '2024-03-16T15:00:22.000Z', required: true })
  @IsDateString()
  createdAt: string;

  public static fromUserEntity(userEntity: UserEntity): UserResponseDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      phone: userEntity.phone || null,
      createdAt: userEntity.createdAt,
    };
  }
}
