import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doc } from 'src/schemas/doc.schema';
import { Field } from 'src/schemas/field.schema';

@Injectable()
export class DocRefManagementService {
  constructor(
    @InjectModel(Doc.name) private docModel: Model<Doc>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
  ) {}

  async addNewFieldRef(docId: string, newField: any) {
    const doc = await this.docModel.findById(docId);
    // doc.fields.push(newField._id);
    // doc.save();
  }

  async removeNewFieldRef(docId: string, fieldId: string) {
    const [doc, field] = await Promise.all([
      this.docModel.findById(docId),
      this.fieldModel.findById(fieldId),
    ]);
    if (doc === null) return;
    await doc.updateOne({ $pull: { fields: field._id } });
  }
}
