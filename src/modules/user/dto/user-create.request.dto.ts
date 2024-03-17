import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UserCreateRequestDto {
  @ApiProperty({ example: 'Jogn Doe', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: 'weakpassword', required: true })
  @IsString()
  password: string;

  @ApiProperty({ example: 'test@mail.com', required: true })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'test@mail.com', required: false })
  @IsPhoneNumber()
  @IsString()
  @IsOptional()
  phone?: string;
}
