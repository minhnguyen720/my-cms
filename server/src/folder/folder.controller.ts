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

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async create(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto);
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

  @Get('move2folder/:pageId')
  async getMoveToFolderData(@Param('pageId') pageId: string) {
    return await this.folderService.moveToFolderData(pageId);
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
