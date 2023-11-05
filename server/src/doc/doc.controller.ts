import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Get(':pageId')
  async getDocByPageId(@Param('pageId') pageId: string) {
    return await this.docService.getDocByPageId(pageId);
  }

  @Get('hasDoc/:docId')
  async hasDoc(@Param('docId') docId: string) {
    return await this.docService.hasDoc(docId);
  }

  @Get('/detail/:detailId')
  async getDocDetail(@Param('detailId') detailId: string) {
    return await this.docService.getDocDetail(detailId);
  }

  @Post()
  async create(@Body() createDocDto: CreateDocDto) {
    return await this.docService.create(createDocDto);
  }

  @Get('key/:key')
  async findByKey(@Param('key') key: string) {
    return await this.docService.findByKey(key);
  }

  @Put('rename')
  async rename(@Body() data) {
    return await this.docService.rename(data);
  }

  @Put('status')
  async updateStatus(
    @Body() body: { id: string; value: boolean; parent: string },
  ) {
    return await this.docService.updateStatus(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.docService.remove(id);
  }
}
