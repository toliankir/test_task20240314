import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'test@mail.com', required: true })
  @IsEmail()
  @IsString()
  username: string;

  @ApiProperty({ example: 'weakpassword', required: true })
  @IsString()
  password: string;
}
