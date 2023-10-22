import { Injectable } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doc } from 'src/schemas/doc.schema';
import { Page } from 'src/schemas/page.schema';
import { Project } from 'src/schemas/project.schema';
import { Folder } from 'src/schemas/folder.schema';
@Injectable()
export class DocService {
  constructor(
    @InjectModel(Doc.name) private docModel: Model<Doc>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
  ) {}

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
    if (key !== 'a321a0cc-eac3-4ec4-a1e9-4c8648229248') return [];
    return await this.docModel
      .findById({ _id: '64e043c9476e09720111aaeb' })
      .populate('data')
      .exec();
  }

  async create(createDocDto: CreateDocDto) {
    const { name, description, pageId, createdDate, updatedDate, parent } =
      createDocDto;
    const newDoc = await this.docModel.create({
      createdDate,
      updatedDate,
      createdUser: 'admin',
      updatedUser: 'admin',
      active: true,
      page: pageId,
      name,
      description,
      parent,
    });

    return newDoc;
  }

  findAll() {
    return `This action returns all doc`;
  }

  findOne(id: string) {
    return `This action returns a #${id} doc`;
  }

  update(id: number, updateDocDto: UpdateDocDto) {
    return `This action updates a #${id} doc`;
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
