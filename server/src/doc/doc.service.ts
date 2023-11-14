import { Injectable, Logger } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doc } from 'src/schemas/doc.schema';
import { Page } from 'src/schemas/page.schema';
import { Project } from 'src/schemas/project.schema';
import { Folder } from 'src/schemas/folder.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class DocService {
  constructor(
    @InjectModel(Doc.name) private docModel: Model<Doc>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
  ) {}
  private readonly logger = new Logger(DocService.name);

  async hasDoc(docId: string) {
    const result = await this.docModel.exists({ _id: docId });
    if (result === null) return false;
    else return true;
  }

  async updateStatus(body: { id: string; value: boolean; parent: string }) {
    try {
      await this.docModel.findByIdAndUpdate(body.id, { active: body.value });
      const newDoc = await this.docModel.find({ parent: body.parent });

      return {
        isSuccess: true,
        newDoc: newDoc,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  }

  async getDocDetail(detailId: string) {
    // return await this.docModel.findById(detailId);
    return detailId;
  }

  async getDocByPageId(pageId: string) {
    const docPromise = this.docModel.find({
      page: new Types.ObjectId(pageId),
      parent: pageId,
    });
    const folderPromise = this.folderModel.find({ parent: pageId });
    const pagePromise = this.pageModel.findById(pageId);

    return Promise.all([docPromise, pagePromise, folderPromise]).then(
      async (values) => {
        const [docData, pageData, folderData] = values;

        return {
          pageData,
          docData,
          folderData,
        };
      },
    );
  }

  async findByKey(key: string) {
    return await this.docModel.findById(key);
  }

  async create(createDocDto: CreateDocDto) {
    const { name, description, pageId, parent, active, isRemove, project } =
      createDocDto;
    const newDoc = await this.docModel.create({
      createdDate: dayjs().toString(),
      updatedDate: dayjs().toString(),
      createdUser: 'admin',
      updatedUser: 'admin',
      page: new Types.ObjectId(pageId),
      project: new Types.ObjectId(project),
      name,
      description,
      parent,
      active,
      isRemove,
    });
    // const page = await this.pageModel.findById(pageId);
    // page.docs.push(newDoc);
    // page.save();

    return newDoc;
  }

  async remove(id: string) {
    await this.docModel.deleteOne({ _id: id });
  }

  async rename(data) {
    const targetDoc = await this.docModel.findById(data.targetData._id);
    targetDoc.name = data.value;
    await targetDoc.save();
    return await this.docModel.find({
      page: data.targetData.page,
    });
  }
}
