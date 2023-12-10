import { Body, Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { Public } from 'src/common/decorators';

@Public()
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('doc')
  async getDocById(@Query('id') docId: string, @Query('key') key: string) {
    // const isValidKey = await this.dataService.checkKey({
    //   type: 'doc',
    //   id: docId,
    //   key,
    // });
    // if (isValidKey) {
    //   return await this.dataService.getDocById(docId);
    // } else {
    //   return false;
    // }
    return await this.dataService.getDocById(docId, key);
  }

  @Get('page')
  async getPageDataByQuery(
    @Query('pg') pageId: string,
    @Query('key') key: string,
  ) {
    const isValidKey = await this.dataService.checkKey({
      type: 'page',
      id: pageId,
      key,
    });
    if (isValidKey) {
      return await this.dataService.getPageDataByQuery(pageId);
    } else {
      return false;
    }
  }

  @Get('project')
  async getProjectDataByQuery(
    @Query('pj') projectId: string,
    @Query('key') key: string,
  ) {
    const isValidKey = await this.dataService.checkKey({
      type: 'project',
      id: projectId,
      key,
    });
    if (isValidKey) {
      return await this.dataService.getProjectDataByQuery(projectId);
    } else {
      return false;
    }
  }

  @Get('test')
  async test(@Body() body) {
    return await this.dataService.test(body);
  }
}
