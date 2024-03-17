import { Controller, Get } from '@nestjs/common';
import { InfoService } from './info.service';
import { TimeResponseDto } from './dto/time.response';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  public getTime(): TimeResponseDto {
    return this.infoService.getTime();
  }
}
