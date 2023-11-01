import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Doc } from 'src/schemas/doc.schema';
import { Field } from 'src/schemas/field.schema';
import { UpdateConfigDto } from './dto/update-config.dto';

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(Doc.name) private docModel: Model<Doc>,
  ) {}
  private readonly logger = new Logger(FieldsService.name);

  async updateFieldConfig(body: UpdateConfigDto) {
    try {
      if (body.fieldId === undefined) throw 'Field ID is undefined';

      // count result when find document by provided id, result = 0 mean does not have any data. The result should be 1 and should not larger than 1
      const count = await this.docModel.count({ _id: body.doc });
      if (count === 0) throw 'Field does not exist';

      // check config
      Object.entries(body.config).forEach(([key, value]) => {
        if (key === undefined) throw 'Some config key are undefined';
        else if (value === undefined) throw 'Some config value are undefined';
      });

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

  async getFieldDataByDetailId(detailId: string) {
    try {
      if (detailId === undefined) throw 'Detail ID is undefined';

      // if document exist -> return 1 else 0
      const hasDoc = await this.docModel.count({ _id: detailId });
      if (hasDoc === 0) throw 'Document does not exist';

      const fieldData = await this.fieldModel.find({
        doc: detailId,
      });

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

  async createNewFields(body: any) {
    try {
      const order = await this.fieldModel.count({ doc: body.doc });
      await this.fieldModel.create({
        ...body,
        label: body.name,
        order,
        active: true,
        createdDate: dayjs().format('DD/MM/YYYY').toString(),
        updatedDate: dayjs().format('DD/MM/YYYY').toString(),
      });
      const newList = await this.fieldModel.find({
        doc: body.doc,
      });
      return {
        isSuccess: true,
        newList,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  }
}
