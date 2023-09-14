import { Injectable } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doc } from 'src/schemas/doc.schema';
import { Page } from 'src/schemas/page.schema';
import { Project } from 'src/schemas/project.schema';
@Injectable()
export class DocService {
  constructor(
    @InjectModel(Doc.name) private docModel: Model<Doc>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async getDocByPageId(pageId: string) {
    const docPromise = this.docModel
      .find({
        page: pageId,
      })
      .exec();
    const pagePromise = this.pageModel.findById(pageId).exec();
    return Promise.all([docPromise, pagePromise]).then(async (values) => {
      const [docData, pageData] = values;
      return {
        pageData,
        docData,
      };
    });
  }

  async findByKey(key: string) {
    if (key !== 'a321a0cc-eac3-4ec4-a1e9-4c8648229248') return [];
    return await this.docModel
      .findById({ _id: '64e043c9476e09720111aaeb' })
      .populate('data')
      .exec();
  }

  async create(createDocDto: CreateDocDto) {
    const { name, description, docId } = createDocDto;
    const newDoc = await this.docModel.create({
      createdDate: new Date(),
      updatedDate: new Date(),
      createdUser: 'admin',
      updatedUser: 'admin',
      active: true,
      page: docId,
      name,
      description,
    });
    const targetPage = await this.pageModel.findById(docId);
    targetPage.docs.push(newDoc);
    await targetPage.save();

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
    const doc = await this.docModel.findById(id);
    const page = await this.pageModel.findById(doc.page);
    const updatedDocList = page.docs.filter((doc) => {
      return doc._id !== id;
    });
    page.docs = updatedDocList;
    Promise.all([page.save(), this.docModel.deleteOne({ _id: id })]);
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
