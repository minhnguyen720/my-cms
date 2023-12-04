import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { MoveToTrashDto } from './dto/movetotrash.dto';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  //static routes
  @Post()
  async create(
    @GetCurrentUserId() userId: string,
    @Body() createPageDto: CreatePageDto,
  ) {
    return await this.pageService.create(userId, createPageDto);
  }

  @Put('status')
  async updateStatus(
    @Body() body: { id: string; value: boolean; projectId: string },
  ) {
    return await this.pageService.updateStatus(body);
  }

  @Get()
  async getDataByPageNumber(
    @Query('perPage') perPage: string,
    @Query('page') page: string,
    @Query('projectId') projectId: string,
  ) {
    const perPageNum = parseInt(perPage, 10);
    const pageNum = parseInt(page, 10);
    return await this.pageService.getDataByPageNumber(
      perPageNum,
      pageNum,
      projectId,
    );
  }

  @Put('movetotrash')
  async moveToTrash(@Body() body: MoveToTrashDto) {
    return await this.pageService.moveToTrash(body);
  }

  //dynamic routes
  @Get(':projectId')
  async findPageBelongToProject(@Param('projectId') projectId: string) {
    return await this.pageService.findPageBelongToProject(projectId);
  }

  @Get('key/:id')
  async findOne(@Param('id') id: string) {
    return await this.pageService.findOne(id);
  }

  @Get(':projectId/total')
  async getTotal(@Param('projectId') projectId: string) {
    return await this.pageService.getTotalPages(projectId);
  }

  @Delete(':projectId/:pageId')
  remove(
    @Param('projectId') projectId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.pageService.remove({ projectId, pageId });
  }
}
