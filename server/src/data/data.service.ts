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

  async getPageDataByQuery(pageId: string) {
    try {
      const [page, docs] = await Promise.all([
        this.pageModel
          .findOne({
            _id: new Types.ObjectId(pageId),
            active: true,
            isRemove: false,
          })
          .select('_id name'),
        this.docModel
          .find({
            page: new Types.ObjectId(pageId),
            active: true,
            isRemove: false,
          })
          .select('_id name description'),
      ]);

      const result = {
        ...page.toObject(),
        docs: [],
      };
      for (const doc of docs) {
        const fields = await this.fieldModel
          .find({
            doc: doc._id,
            active: true,
          })
          .select('_id label order value');
        const docData = {
          ...doc.toObject(),
          fields: fields,
        };
        result.docs.push(docData);
      }
      return {
        ...result,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
      };
    }
  }

  async getProjectDataByQuery(projectId: string) {
    try {
      const [project, pages] = await Promise.all([
        this.projectModel
          .findOne({
            _id: new Types.ObjectId(projectId),
            active: true,
          })
          .select('_id name'),
        this.pageModel
          .find({
            project: new Types.ObjectId(projectId),
            active: true,
            isRemove: false,
          })
          .select('_id name'),
        ,
      ]);
      const result = {
        ...project.toObject(),
        pages: [],
      };
      for (const page of pages) {
        const docs = await this.docModel
          .find({
            page: page._id,
            active: true,
            isRemove: false,
          })
          .select('_id name description');
        const pageData = {
          ...page.toObject(),
          docs: [],
        };
        for (const doc of docs) {
          const fields = await this.fieldModel
            .find({
              doc: doc._id,
              active: true,
            })
            .select('_id label order value');
          const docData = {
            ...doc.toObject(),
            fields: fields,
          };
          pageData.docs.push(docData);
        }
        result.pages.push(pageData);
      }

      return { ...result };
    } catch (error) {
      console.error(error);
      return {
        message: 'Something went wrong',
      };
    }
  }
}

//Utilities
