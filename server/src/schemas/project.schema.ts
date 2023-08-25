import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Page } from './page.schema';
import { Transform } from 'class-transformer';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ collection: 'projects' })
export class Project {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  id: string;

  @Prop()
  createDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop()
  createdUser: string;

  @Prop()
  updatedUser: string;

  @Prop()
  superAdminId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Page' })
  pages: Page[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
