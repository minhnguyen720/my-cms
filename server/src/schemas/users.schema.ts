import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ collection: 'users' })
export class Users {
  // @Prop({ type: Types.ObjectId })
  // _id: Types.ObjectId;

  @Prop()
  id: string;

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
