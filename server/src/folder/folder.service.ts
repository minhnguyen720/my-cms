import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from 'src/schemas/folder.schema';
import { Model } from 'mongoose';

@Injectable()
export class FolderService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  create(createFolderDto: CreateFolderDto) {
    return 'This action adds a new folder';
  }

  async findFolderByPageId(pageId: string) {
    return await this.folderModel.find({ page: pageId });
  }

  async findAll() {
    return await this.folderModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
