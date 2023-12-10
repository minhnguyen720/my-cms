import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CheckKeyDto } from 'src/auth/dto/check-key.dto';
import { Doc } from 'src/schemas/doc.schema';
import { Field } from 'src/schemas/field.schema';
import { Page } from 'src/schemas/page.schema';
import { Project } from 'src/schemas/project.schema';
import { Users } from 'src/schemas/users.schema';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Doc.name) private docModel: Model<Doc>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) {}

  private logger = new Logger(DataService.name);

  async getDocById(docId: string, key: string) {
    const [doc, fields, user] = await Promise.all([
      this.docModel.findById(docId).select('_id name description createdDate'),
      this.fieldModel
        .find({
          doc: docId,
          active: true,
        })
        .select('_id label order value fieldId'),
      this.userModel.find({
        apikey: key,
      }),
    ]);
    const formatedFields = fields.reduce((result, item) => {
      const { _id, label, order, value, fieldId } = item;
      result[fieldId] = { _id, label, order, value };

      return result;
    }, {});
    return {
      ...doc.toObject(),
      author: user[0].name,
      fields: formatedFields,
    };
  }

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
          .select('_id label order value fieldId');
        const formatedFields = fields.reduce((result, item) => {
          const { _id, label, order, value, fieldId } = item;
          result[fieldId] = { _id, label, order, value };

          return result;
        }, {});
        const docData = {
          ...doc.toObject(),
          fields: formatedFields,
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
            .select('_id label order value fieldId createdDate');

          const formatedFields = fields.reduce((result, item) => {
            const { _id, label, order, value, fieldId } = item;
            result[fieldId] = { _id, label, order, value };

            return result;
          }, {});
          const docData = {
            ...doc.toObject(),
            fields: formatedFields,
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
  //Utilities
  async checkKey(checkKeyDto: CheckKeyDto): Promise<boolean | any> {
    try {
      const { type, id, key } = checkKeyDto;

      switch (type) {
        case 'page':
          const [page, pageOwner] = await Promise.all([
            this.pageModel.findById(id),
            this.userModel.findOne({
              apikey: key,
            }),
          ]);
          const populatedPage = await page.populate('createdUser');

          return populatedPage.createdUser.id === pageOwner.id;
        case 'project':
          const [project, projectOwner] = await Promise.all([
            this.projectModel.findById(id),
            this.userModel.findOne({
              apikey: key,
            }),
          ]);

          return project.createdUser === projectOwner.id;
        case 'doc':
          const [doc] = await Promise.all([this.docModel.findById(id)]);
        default:
          return false;
      }
    } catch (error) {
      this.logger.error(error);
    }
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
