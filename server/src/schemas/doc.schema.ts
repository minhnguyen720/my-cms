import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field } from './field.schema';

export type DocDocument = HydratedDocument<Doc>;

@Schema()
export class Doc {
  @Prop()
  id: string;

  @Prop()
  name: string;

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

  // number of field within the document
  @Prop()
  fields: number;

  // is this document is visible for client
  @Prop()
  active: boolean;

  // data used for rendering purpose
  @Prop()
  data: Field[];

  // List of user ids
  @Prop()
  assignedUsers?: string[];
}

export const DocSchema = SchemaFactory.createForClass(Doc);
