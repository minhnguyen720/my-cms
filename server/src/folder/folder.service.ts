import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from 'src/schemas/folder.schema';
import { Model } from 'mongoose';

@Injectable()
export class FolderService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async create(createFolderDto: CreateFolderDto) {
    try {
      await this.folderModel.create(createFolderDto);
      return {
        isSuccess: true,
        latestFolderList: await this.findFolderByPageId(createFolderDto.page),
      };
    } catch (error) {
      console.log(error);
      return {
        isSuccess: false,
        latestFolderList: [],
      };
    }
  }

  findFolderByPageId(pageId: any) {
    return this.folderModel.find({
      page: pageId,
    });
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

  async rename(body) {
    try {
      const res = await this.folderModel.findByIdAndUpdate(body.folderId, {
        name: body.name,
      });

      if (Object.keys(res).length === 0)
        return {
          isSuccess: false,
          latestFolderList: undefined,
        };

      return {
        isSuccess: true,
        latestFolderList: await this.findFolderByPageId(body.pageId),
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        latestFolderList: undefined,
      };
    }
  }

  async remove(folderId: string, pageId: string) {
    try {
      const queryRes = await this.folderModel.findByIdAndDelete(folderId);
      if (Object.keys(queryRes).length === 0)
        return {
          isSuccess: false,
          latestFolderList: undefined,
        };

      return {
        isSuccess: true,
        latestFolderList: await this.findFolderByPageId(pageId),
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        latestFolderList: undefined,
      };
    }
  }
}
