import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Page } from './page.schema';
import { Project } from './project.schema';
import { Doc } from './doc.schema';

export type FieldDocument = HydratedDocument<Field>;

@Schema({ collection: 'fields' })
export class Field {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  id?: string;

  @Prop()
  type: string;

  // for form query
  @Prop()
  fieldId: string;

  @Prop()
  label?: string;

  // for image and image_text type, this value meant for image src
  // for text related type, this value meant for content
  @Prop()
  value?: string;

  @Prop()
  active: boolean;

  // for input component
  @Prop()
  placeholder?: string;

  @Prop()
  icon?: string;

  @Prop()
  required?: boolean;

  @Prop()
  isUseEditor?: boolean;

  @Prop()
  order: number;

  @Prop()
  createdDate: string;

  @Prop()
  updatedDate: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Doc' })
  doc: Doc;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Page' })
  page: Page;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  project: Project;

  //For image type, used to find and delete the current file from the collection
  @Prop()
  fileId?: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
