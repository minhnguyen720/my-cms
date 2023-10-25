import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from 'src/schemas/folder.schema';
import { Model } from 'mongoose';
import { Page } from 'src/schemas/page.schema';
import { Doc } from 'src/schemas/doc.schema';
import { MoveFolderDto } from './dto/move-folder.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Doc.name) private docModel: Model<Doc>,
  ) {}

  async getFolderDetail(id: string) {
    const docPromise = this.docModel.find({
      parent: id,
    });
    const folderPromise = this.folderModel.find({ parent: id });
    return Promise.all([docPromise, folderPromise]).then(async (values) => {
      const [docData, folderData] = values;

      return {
        docData,
        folderData,
      };
    });
  }

  async move(body: MoveFolderDto) {
    try {
      switch (body.type) {
        case 'doc':
          const doc = await this.docModel.findByIdAndUpdate(body.targetId, {
            parent: body.movingId,
          });
          if (doc === undefined) return { success: false };
          return {
            success: true,
          };
        case 'folder':
          const folder = await this.folderModel.findByIdAndUpdate(
            body.targetId,
            {
              parent: body.movingId,
            },
          );
          if (folder === undefined) return { success: false };
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
      await this.folderModel.create({
        createdDate: dayjs().toString(),
        updatedDate: dayjs().toString(),
        ...createFolderDto,
      });
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

  async getMoveToFolderData(param: string) {
    const tokens = param.split('&&');
    const targetId = tokens[0];
    const pageId = tokens[1];
    const type = tokens[2];

    if (type === undefined) return;

    const pagePromise = this.pageModel.findById(pageId).select('name');

    let targetPromise = undefined;
    if (type === 'folder') {
      targetPromise = this.folderModel.findById(targetId);
    } else if (type === 'doc') {
      targetPromise = this.docModel.findById(targetId);
    } else {
      return;
    }

    const foldersPromise = this.findFolderByPageId(pageId);
    return Promise.all([pagePromise, foldersPromise, targetPromise]).then(
      (values) => {
        const [page, folders, target] = values;
        const mappedData = folders.map((folder) => {
          return {
            id: folder._id,
            name: folder.name,
            page: page.name,
            project: folder.project,
            updatedDate: folder.updatedDate,
          };
        });
        return { folders: mappedData, selection: target.folders };
      },
    );
  }

  async findAll() {
    return await this.folderModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
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
