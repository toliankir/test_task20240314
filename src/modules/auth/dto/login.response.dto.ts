import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 1, required: true })
  id: number;

  @ApiProperty({ description: 'Access jwt token', required: true })
  token: string;

  @ApiProperty({ description: 'Refresh jwt token', required: true })
  refreshToken: string;
}
