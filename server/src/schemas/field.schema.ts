import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FieldDocument = HydratedDocument<Field>;

@Schema()
export class Field {
  @Prop()
  type: string;

  @Prop()
  field_id: string;

  @Prop()
  label?: string;

  @Prop()
  value?: string;

  @Prop()
  disabled: boolean;

  // for input component
  @Prop()
  placeholder?: string;

  @Prop()
  icon?: any;

  @Prop()
  required: boolean;

  @Prop()
  isUseEditor?: boolean;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
