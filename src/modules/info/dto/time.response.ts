import { ApiProperty } from '@nestjs/swagger';

export class TimeResponseDto {
  @ApiProperty()
  time: number;
}
