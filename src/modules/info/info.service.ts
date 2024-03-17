import { Injectable } from '@nestjs/common';
import { TimeResponseDto } from './dto/time.response';

@Injectable()
export class InfoService {
  public getTime(): TimeResponseDto {
    return {
      time: Date.now(),
    };
  }
}
