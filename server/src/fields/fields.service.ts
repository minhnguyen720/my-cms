import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model, Types } from 'mongoose';
import { Field } from 'src/schemas/field.schema';
import { UpdateConfigDto } from './dto/update-config.dto';
import { checkUndefined, checkValidBody } from 'src/utilities/validate';
import { DocService } from 'src/doc/doc.service';
import { DocRefManagementService } from 'src/doc/doc_ref.service';

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    private readonly docService: DocService,
    private readonly docRefManagement: DocRefManagementService,
  ) {}
  private readonly logger = new Logger(FieldsService.name);

  async swapOrder(from: string, to: string) {
    try {
      const [fromField, toField] = await Promise.all([
        this.fieldModel.findById(from),
        this.fieldModel.findById(to),
      ]);
      if (fromField === undefined || toField === undefined)
        return {
          isSuccess: false,
        };

      await Promise.all([
        fromField.updateOne({
          order: toField.order,
        }),
        toField.updateOne({
          order: fromField.order,
        }),
      ]);
      return {
        isSuccess: true,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isSuccess: false,
      };
    }
  }

  async deleteFieldByFieldId(docId: string, fieldId: string) {
    try {
      await this.docRefManagement.removeNewFieldRef(docId, fieldId);
      await this.fieldModel.findByIdAndDelete(fieldId);
      this.logger.log(`Deleted field ${fieldId}`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getFieldById(fieldId: string) {
    try {
      return await this.fieldModel.findById(fieldId);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateFieldByFieldId(fieldId: string, body: any) {
    try {
      checkUndefined(fieldId, 'docId is undefined');
      checkValidBody(body);

      const isFieldExist = await this.fieldModel.exists({ _id: fieldId });
      if (isFieldExist === null) throw 'Field is not exist';

      await this.fieldModel.findByIdAndUpdate(fieldId, body);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateFieldId(newFieldId: string, detailId: string, docId: string) {
    try {
      await this.fieldModel.findByIdAndUpdate(detailId, {
        fieldId: newFieldId,
        updatedDate: dayjs().toDate(),
      });
      this.logger.log('Update field id success');
      const newData = await this.fieldModel.find({ doc: docId });
      return {
        isSuccess: true,
        newData,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isSuccess: false,
      };
    }
  }

  async updateFieldsByDocId(docId: string, body: any) {
    try {
      checkUndefined(docId, 'docId is undefined');
      checkValidBody(body);

      const isDocExist = await this.docService.hasDoc(docId);
      if (!isDocExist) throw 'Document is not found';

      for (const [key, value] of Object.entries(body)) {
        await this.fieldModel.findByIdAndUpdate(key, {
          value: value,
          updatedDate: dayjs().toDate(),
        });
      }

      const newData = await this.fieldModel.find({ doc: docId });

      return {
        isSuccess: true,
        newData,
      };
    } catch (error) {
      this.logger.error(error);

      return {
        isSuccess: false,
      };
    }
  }

  async updateFieldConfig(body: UpdateConfigDto) {
    try {
      checkUndefined(body.fieldId, 'Field ID is undefined');
      checkValidBody(body);

      const isDocExist = await this.docService.hasDoc(body.doc);
      if (!isDocExist) throw 'Field does not exist';

      await this.fieldModel.findByIdAndUpdate(body.fieldId, body.config);
      const fieldData = await this.fieldModel.find({ doc: body.doc });

      return {
        isSuccess: true,
        fieldData,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isSuccess: false,
      };
    }
  }

  async getFieldDataByDetailId(docId: string) {
    try {
      checkUndefined(docId, 'Detail ID is undefined');

      const isDocExist = await this.docService.hasDoc(docId);
      if (!isDocExist) throw 'Field does not exist';

      const fieldData = await this.fieldModel
        .find({
          doc: docId,
        })
        .sort({ order: 1 });

      return {
        isSuccess: true,
        fieldData,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isSuccess: false,
      };
    }
  }

  async getDataByFilter(fieldId: string, filter: any) {
    return filter
      ? await this.fieldModel.find({ _id: fieldId, ...filter })
      : await this.fieldModel.find({ _id: fieldId });
  }

  async createNewFields(body: any) {
    try {
      const order = await this.fieldModel.countDocuments({ doc: body.doc });
      const newField = await this.fieldModel.create({
        ...body,
        doc: new Types.ObjectId(body.doc),
        project: new Types.ObjectId(body.project),
        page: new Types.ObjectId(body.page),
        label: body.name,
        order,
        active: true,
        createdDate: dayjs().toDate(),
        updatedDate: dayjs().toDate(),
        fieldId: body.fieldId,
      });
      // .then(async (result) => {
      //   await this.docRefManagement.addNewFieldRef(body.doc, result);
      // });
      const newList = await this.fieldModel.find({
        doc: body.doc,
      });
      return {
        isSuccess: true,
        newList,
        newField,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  }
}
