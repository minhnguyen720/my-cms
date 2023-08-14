import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Doc } from './doc.schema';

export type PageDocument = HydratedDocument<Page>;

@Schema()
export class Page {
  // use id as an param to fetch data
  @Prop()
  id: string;

  // this name describe the purpose of this page
  @Prop()
  name: string;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  // user id
  @Prop()
  createdUser: string;

  @Prop()
  updatedUser: string;

  @Prop({ ref: 'Doc' })
  doc: Doc;
}

export const PageSchema = SchemaFactory.createForClass(Page);
