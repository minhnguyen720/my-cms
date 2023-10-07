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
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { MoveFolderDto } from './dto/move-folder.dto';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async create(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto);
  }

  @Put("move")
  async move(@Body() body: MoveFolderDto) {
    return await this.folderService.move(body);
  }

  @Get()
  async findAll() {
    return await this.folderService.findAll();
  }

  @Get('page/:pageId')
  async findFolderByPageId(@Param('pageId') pageId: string) {
    return await this.folderService.findFolderByPageId(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderService.findOne(+id);
  }

  @Get('getMoveToFolderData/:param')
  async getMoveToFolderData(@Param('param') param: string) {
    return await this.folderService.getMoveToFolderData(param);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(+id, updateFolderDto);
  }

  @Put('rename')
  async rename(@Body() body) {
    return await this.folderService.rename(body);
  }

  @Delete(':folderId/:pageId')
  async remove(
    @Param('folderId') folderId: string,
    @Param('pageId') pageId: string,
  ) {
    return await this.folderService.remove(folderId, pageId);
  }
}
