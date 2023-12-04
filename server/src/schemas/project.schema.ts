import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ collection: 'projects' })
export class Project {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  id?: string;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop()
  createdUser: string;

  @Prop()
  updatedUser: string;

  @Prop()
  superAdminId: string;

  @Prop()
  name?: string;

  @Prop()
  active: boolean;

  @Prop()
  isRemove: boolean;

  @Prop()
  users: string[];

  @Prop()
  owner: string;

  // @Prop({ type: MongooseSchema.Types.Array, ref: 'Page' })
  // pages: Page[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
