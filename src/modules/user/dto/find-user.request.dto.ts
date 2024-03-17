import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class FindUserRequestDto {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsPositive()
  userId: number;
}
