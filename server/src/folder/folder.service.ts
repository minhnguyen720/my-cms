import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from 'src/schemas/folder.schema';
import { Model } from 'mongoose';
import { Page } from 'src/schemas/page.schema';
import { Doc } from 'src/schemas/doc.schema';
import { MoveFolderDto } from './dto/move-folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Doc.name) private docModel: Model<Doc>,
  ) {}

  async move(body: MoveFolderDto) {
    try {
      switch (body.type) {
        case 'doc':
          const doc = await this.docModel.findById(body.targetId);
          if (doc === undefined) return { success: false };
          
          const newDocFolders = doc.folders.concat(body.ids);
          doc.folders = newDocFolders;
          doc.save();
          return {
            success: true,
          };
        case 'folder':
          for (const id of body.ids) {
            await this.folderModel.findByIdAndUpdate(body.targetId, {
              folder: id,
            });
          }
          return {
            success: true,
          };
        default:
          return;
      }
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

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

  async findFolderByPageId(pageId: any) {
    return this.folderModel.find({
      page: pageId,
    });
  }

  async moveToFolderData(pageId: string) {
    const pagePromise = this.pageModel.findById(pageId).select('name');
    const foldersPromise = this.findFolderByPageId(pageId);
    return Promise.all([pagePromise, foldersPromise]).then((values) => {
      const [page, folders] = values;
      const mappedData = folders.map((folder) => {
        return {
          id: folder._id,
          name: folder.name,
          page: page.name,
          project: folder.project,
          updatedDate: folder.updatedDate,
        };
      });
      return mappedData;
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
