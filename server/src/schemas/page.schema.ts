import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Doc } from './doc.schema';
import { Transform } from 'class-transformer';

export type PageDocument = HydratedDocument<Page>;

@Schema({ collection: 'page' })
export class Page {
  // use id as an param to fetch data
  @Prop()
  id: string;

  // this name describe the purpose of this page
  @Prop({ required: true })
  name: string;

  @Prop()
  createdDate: string;

  @Prop()
  updatedDate: string;

  // user id
  @Prop()
  createdUser: string;

  @Prop()
  updatedUser: string;

  // _id of Project
  @Prop()
  project: string;

  @Prop({ type: MongooseSchema.Types.Array, ref: 'Doc' })
  docs?: Doc[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
