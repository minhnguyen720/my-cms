import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type FieldDocument = HydratedDocument<Field>;

@Schema({ collection: 'fields' })
export class Field {
  @Prop()
  id?: string;

  @Prop()
  type: string;

  // for form query
  @Prop()
  field_id: string;

  @Prop()
  label?: string;

  // for image and image_text type, this value meant for image src
  // for text related type, this value meant for content
  @Prop()
  value?: string;

  @Prop()
  active: boolean;

  // for input component
  @Prop()
  placeholder?: string;

  @Prop()
  icon?: string;

  @Prop()
  required?: boolean;

  @Prop()
  isUseEditor?: boolean;

  @Prop()
  order: number;

  @Prop()
  createdDate: string;

  @Prop()
  updatedDate: string;

  @Prop()
  doc: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
