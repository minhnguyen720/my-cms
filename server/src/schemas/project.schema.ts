import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Page } from './page.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ collection: 'projects' })
export class Project {
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

  @Prop({ ref: 'Page' })
  pages: Page[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
