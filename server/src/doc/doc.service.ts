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
      // const projectData = await this.projectModel.find({

      // })
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

  create(createDocDto: CreateDocDto) {
    return 'This action adds a new doc';
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

  remove(id: number) {
    return `This action removes a #${id} doc`;
  }
}
