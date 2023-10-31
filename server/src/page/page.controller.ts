import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { MoveToTrashDto } from './dto/movetotrash.dto';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async create(@Body() createPageDto: CreatePageDto) {
    return await this.pageService.create(createPageDto);
  }

  @Put('status')
  async updateStatus(
    @Body() body: { id: string; value: boolean; projectId: string },
  ) {
    return await this.pageService.updateStatus(body);
  }

  @Get(':projectId')
  async findPageBelongToProject(@Param('projectId') projectId: string) {
    return await this.pageService.findPageBelongToProject(projectId);
  }

  @Get('key/:id')
  async findOne(@Param('id') id: string) {
    return await this.pageService.findOne(id);
  }

  @Put('movetotrash')
  async moveToTrash(@Body() body: MoveToTrashDto) {
    return await this.pageService.moveToTrash(body);
  }

  @Delete(':projectId/:pageId')
  remove(
    @Param('projectId') projectId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.pageService.remove({ projectId, pageId });
  }
}
