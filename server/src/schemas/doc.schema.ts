import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Transform } from 'class-transformer';
import { Page } from './page.schema';
import { Field } from './field.schema';

export type DocDocument = HydratedDocument<Doc>;

@Schema({ collection: 'doc' })
export class Doc {
  @Transform(({ value }) => value.toString())
  _id: string;

  // Each doc can within or not within a folder
  @Prop({ type: MongooseSchema.Types.Mixed, ref: 'Folder' })
  folder: any;

  // _id of page has this doc
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Page' })
  page: Page;

  @Prop({ required: true })
  id: string;

  @Prop()
  name: string;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  // user id
  @Prop()
  createdUser: string;

  // user id
  @Prop()
  updatedUser: string;

  // data used for rendering purpose
  @Prop({ type: MongooseSchema.Types.Array, ref: 'Field' })
  fields: Field[];

  // is this document is visible for client
  @Prop()
  active: boolean;

  // List of user ids
  @Prop()
  assignedUsers?: string[];

  @Prop()
  desciption?: string;
}

export const DocSchema = SchemaFactory.createForClass(Doc);
