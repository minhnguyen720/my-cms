import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ collection: 'users' })
export class Users {
  // @Prop({ type: Types.ObjectId })
  // _id: Types.ObjectId;

  @Prop()
  apikey: string;

  @Prop({ default: false })
  emailConfirm: boolean;

  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: string;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop()
  avatar?: string;

  @Prop()
  hashedRefreshToken: string | null;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
