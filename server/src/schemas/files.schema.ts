import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilesDocument = HydratedDocument<Files>;

@Schema({ collection: 'files' })
export class Files {
  @Prop()
  fieldId: string;

  @Prop()
  detailId: string;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop()
  src?: string;

  @Prop()
  path: string;

  @Prop()
  destination: string;

  @Prop()
  originalName: string;

  @Prop()
  filename: string;

  @Prop()
  size: number;

  @Prop()
  fileType: string;
}

export const FilesSchema = SchemaFactory.createForClass(Files);
