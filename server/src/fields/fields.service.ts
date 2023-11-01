import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Field } from 'src/schemas/field.schema';

@Injectable()
export class FieldsService {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  async createNewFields(body: any) {
    try {
      const order = await this.fieldModel.count({ doc: body.doc });
      await this.fieldModel.create({
        ...body,
        label: body.name,
        order,
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
