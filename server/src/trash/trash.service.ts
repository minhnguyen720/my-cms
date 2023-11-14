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
import { DocRefManagementService } from 'src/doc/doc_ref.service';

@Injectable()
export class TrashService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(Doc.name) private docModel: Model<Doc>,
    private readonly storageService: StorageService,
    private readonly docRefManagement: DocRefManagementService,
  ) {}

  private readonly logger = new Logger(TrashService.name);

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
          body.ids.forEach(async (item) => {
            const page = await this.pageModel.findById(item);
            await this.removeDocByPageId(page._id.toString());
            const project = await this.projectModel.findById(body.projectId);
            await project.updateOne({ $pull: { pages: page._id } });
          });
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
      case 'project':
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

  // utilities
  async removeDocByPageId(pageId: string) {
    try {
      const docs = await this.docModel.find({
        page: new Types.ObjectId(pageId),
      });

      if (docs !== null && docs !== undefined) {
        docs.forEach(async (doc) => {
          const fields = await this.fieldModel.find({
            doc: doc._id.toString(),
          });

          const imageFields = [];
          const otherFields = [];
          fields.forEach((field) => {
            if (field.type === 'image') {
              imageFields.push(field);
            } else {
              otherFields.push(field);
            }
          });

          // remove file from disk and collection
          if (imageFields.length > 0) {
            imageFields.forEach(async (imgField) => {
              Promise.all([
                this.docRefManagement.removeNewFieldRef(doc._id, imgField._id),
                this.fieldModel.deleteOne({ _id: imgField._id }),
                this.storageService.removeFromCollection(imgField.fileId),
                this.storageService.removeFileFromDisk(imgField.fileId),
              ]);
            });
          }

          // handle other field type
          if (otherFields.length > 0) {
            otherFields.forEach(async (field) => {
              await this.docRefManagement.removeNewFieldRef(doc._id, field._id);
              await this.fieldModel.deleteOne({ _id: field._id });
            });
          }

          await this.docModel.deleteOne({
            _id: doc._id,
          });
        });
      }
    } catch (error) {
      this.logger.error(error);
      return;
    }
  }
}
