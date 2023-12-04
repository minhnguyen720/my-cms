import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Users } from './users.schema';
import { Project } from './project.schema';

export type PageDocument = HydratedDocument<Page>;

@Schema({ collection: 'page' })
export class Page {
  _id: MongooseSchema.Types.ObjectId;

  // use id as an param to fetch data
  @Prop()
  id?: string;

  // this name describe the purpose of this page
  @Prop({ required: true })
  name: string;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  // user id
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  createdUser: Users;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  updatedUser: Users;

  // _id of Project
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
  project: Project;

  @Prop()
  active: boolean;

  @Prop()
  isRemove: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  users: Users[];

  // @Prop({ type: MongooseSchema.Types.Array, ref: 'Doc' })
  // docs: Doc[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
