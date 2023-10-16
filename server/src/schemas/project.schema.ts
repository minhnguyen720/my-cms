import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ collection: 'projects' })
export class Project {
  // @Transform(({ value }) => value.toString())
  // _id: string;

  @Prop()
  id?: string;

  @Prop()
  createdDate: string;

  @Prop()
  updatedDate: string;

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
  // @Prop({ type: MongooseSchema.Types.Array, ref: 'Page' })
  // pages?: Page[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
