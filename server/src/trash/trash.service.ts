import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder } from 'src/schemas/folder.schema';
import { Page } from 'src/schemas/page.schema';
import { RestoreDto } from './dto/restore.dto';

@Injectable()
export class TrashService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
  ) {}

  async removeSelected(body: RestoreDto) {
    switch (body.type) {
      case 'folder':
        try {
          await this.folderModel.deleteMany({
            _id: { $in: body.ids },
            isRemove: true,
          });
          const newList = await this.folderModel.find({
            project: body.projectId,
          });
          return {
            isSuccess: true,
            newList,
          };
        } catch (error) {
          console.error(error);
          return {
            isSuccess: false,
            newList: [],
          };
        }
      case 'page':
        try {
          await this.pageModel.deleteMany({
            _id: { $in: body.ids },
            isRemove: true,
          });
          const newList = await this.pageModel.find({
            project: body.projectId,
          });
          return {
            isSuccess: true,
            newList,
          };
        } catch (error) {
          console.error(error);
          return {
            isSuccess: false,
            newList: [],
          };
        }
      default:
        return {
          isSuccess: false,
          newList: [],
        };
    }
  }

  async restore(body: RestoreDto) {
    switch (body.type) {
      case 'folder':
        try {
          await this.folderModel.updateMany(
            { _id: { $in: body.ids } },
            { isRemove: false },
          );
          const newList = await this.folderModel.find({
            isRemove: true,
            project: body.projectId,
          });
          return {
            isSuccess: true,
            newList,
          };
        } catch (error) {
          console.error(error);
          return {
            isSuccess: false,
            newList: [],
          };
        }
      case 'page':
        try {
          await this.pageModel.updateMany(
            { _id: { $in: body.ids } },
            { isRemove: false },
          );
          const newList = await this.pageModel.find({
            isRemove: true,
            project: body.projectId,
          });
          return {
            isSuccess: true,
            newList,
          };
        } catch (error) {
          console.error(error);
          return {
            isSuccess: false,
            newList: [],
          };
        }
      default:
        return {
          isSuccess: false,
          newList: [],
        };
    }
  }

  async getTrashDataByType(type: string, projectId: string) {
    switch (type) {
      case 'all':
        const folderPromise = this.folderModel.find({
          project: projectId,
          isRemove: true,
        });
        const pagePromise = this.pageModel.find({
          project: projectId,
          isRemove: true,
        });
        const [page, folder] = await Promise.all([pagePromise, folderPromise]);
        return {
          page,
          folder,
        };
      case 'folder':
        return await this.folderModel.find({
          project: projectId,
          isRemove: true,
        });
      case 'page':
        return await this.pageModel.find({
          project: projectId,
          isRemove: true,
        });
      default:
        return [];
    }
  }

  async empty() {
    try {
      const folderPromise = this.folderModel.deleteMany({ isRemove: true });
      const pagePromise = this.pageModel.deleteMany({ isRemove: true });
      await Promise.all([folderPromise, pagePromise]);
      return {
        isSuccess: true,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  }
}