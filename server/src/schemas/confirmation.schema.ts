import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConfirmationDocument = HydratedDocument<Confirmation>;

@Schema({ collection: 'confirmation' })
export class Confirmation {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;
}

export const ConfirmationSchema = SchemaFactory.createForClass(Confirmation);
