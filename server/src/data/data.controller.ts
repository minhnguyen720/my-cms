import { Body, Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { Public } from 'src/common/decorators';

@Public()
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  async getPageDataByQuery(
    @Query('pg') pageId: string,
    @Query('key') key: string,
  ) {
    return await this.dataService.getPageDataByQuery(pageId);
  }

  @Get('test')
  async test(@Body() body) {
    return await this.dataService.test(body);
  }
}
