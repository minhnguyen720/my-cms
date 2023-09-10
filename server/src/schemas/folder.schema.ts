import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({ collection: 'folder' })
export class Folder {
  @Transform(({ value }) => value.toString())
  _id: string;

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

  @Prop()
  name: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
