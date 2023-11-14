import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Folder } from 'src/schemas/folder.schema';
import { Page } from 'src/schemas/page.schema';
import { RestoreDto } from './dto/restore.dto';
import { Project } from 'src/schemas/project.schema';
import { Field } from 'src/schemas/field.schema';
import { Doc } from 'src/schemas/doc.schema';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class TrashService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(Doc.name) private docModel: Model<Doc>,
    private readonly storageService: StorageService,
  ) {}

  private readonly logger = new Logger(TrashService.name);

  async removeSelected(body: RestoreDto) {
    switch (body.type) {
      case 'folder':
        this.handleDeleteFolders(body);
      case 'page':
        this.handleDeletePages(body);
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

  async handleDeletePages(body: RestoreDto) {
    try {
      for (const item of body.ids) {
        const project = await this.projectModel.findById(body.projectId);
        const pageObjectId = new Types.ObjectId(item);
        const docs = await this.docModel.find({
          page: pageObjectId,
          project: project._id,
        });

        // Remove field and files relate to this page'
        for (const doc of docs) {
          const imageFields = await this.fieldModel.find({
            type: 'image',
            page: pageObjectId,
            project: project._id,
            doc: doc._id,
          });
          for (const imageField of imageFields) {
            await Promise.all([
              this.storageService.removeFromCollection(imageField.fileId),
              this.storageService.removeFileFromDisk(imageField.fileId),
            ]);
          }
          await this.fieldModel.deleteMany({
            page: pageObjectId,
            project: project._id,
            doc: doc._id,
          });
        }

        await this.docModel.deleteMany({
          page: pageObjectId,
          project: project._id,
        });
      }

      await this.pageModel.deleteMany({
        _id: { $in: body.ids },
        isRemove: true,
      });

      const newList = await this.pageModel.find({
        project: body.projectId,
        isRemove: true,
      });
      return {
        isSuccess: true,
        newList,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isSuccess: false,
        newList: [],
      };
    }
  }

  async handleDeleteFolders(body: RestoreDto) {
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
      this.logger.error(error);
      return {
        isSuccess: false,
        newList: [],
      };
    }
  }
}
