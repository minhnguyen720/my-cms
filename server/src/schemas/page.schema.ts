import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Users } from './users.schema';
import { Doc } from './doc.schema';

export type PageDocument = HydratedDocument<Page>;

@Schema({ collection: 'page' })
export class Page {
  // @Prop({ type: Types.ObjectId })
  // _id?: Types.ObjectId;

  // use id as an param to fetch data
  @Prop()
  id?: string;

  // this name describe the purpose of this page
  @Prop({ required: true })
  name: string;

  @Prop()
  createdDate: string;

  @Prop()
  updatedDate: string;

  // user id
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  createdUser: Users;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  updatedUser: Users;

  // _id of Project
  @Prop()
  project: string;

  @Prop()
  active: boolean;

  @Prop()
  isRemove: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  users: Users[];

  @Prop({ type: MongooseSchema.Types.Array, ref: 'Doc' })
  docs: Doc[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
