import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponseDto {
  @ApiProperty({ example: 1, required: true })
  id: number;

  @ApiProperty({ description: 'Access jwt token', required: true })
  token: string;
}
