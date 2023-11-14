import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doc } from 'src/schemas/doc.schema';
import { Field } from 'src/schemas/field.schema';
import { Page } from 'src/schemas/page.schema';
import { Project } from 'src/schemas/project.schema';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Doc.name) private docModel: Model<Doc>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
  ) {}

  async getPageDataByQuery(pageId) {
    return await this.pageModel
      .find({
        _id: pageId,
      })
      .select('_id name docs project')
      .populate({
        path: 'docs',
        model: 'Doc',
        select: {
          page: 0,
          folders: 0,
          createdUser: 0,
          updatedUser: 0,
          createdDate: 0,
          updatedDate: 0,
          isRemove: 0,
          active: 0,
          assignedUsers: 0,
          parent: 0,
          __v: 0,
        },
        populate: {
          path: 'fields',
          model: 'Field',
          select: 'value',
        },
      });
  }

  async test(body) {
    try {
      const pageObjectId = new Types.ObjectId(body.pageId);
      const projectObjectId = new Types.ObjectId(body.projectId);
      const docs = await this.docModel.find({
        page: pageObjectId,
        project: projectObjectId,
      });

      const imageFields = [];
      for (const doc of docs) {
        const result = await this.fieldModel.findOne({
          type: 'image',
          page: pageObjectId,
          project: projectObjectId,
          doc: doc._id,
        });
        imageFields.push(result);
      }

      return imageFields;
    } catch (error) {
      return error;
    }
  }
}
