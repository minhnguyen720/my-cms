import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Get(':pageId')
  async getDocByPageId(@Param('pageId') pageId: string) {
    return await this.docService.getDocByPageId(pageId);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    return this.docService.update(+id, updateDocDto);
  }

  @Put('rename')
  async rename(@Body() data) {
    return await this.docService.rename(data);
  }

  @Put('status')
  async updateStatus(@Body() body: { id: string; value: boolean }) {
    return await this.docService.updateStatus(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.docService.remove(id);
  }
}
