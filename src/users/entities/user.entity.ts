import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Property } from 'src/properties/entities/property.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  avatar: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Property.name }] })
  allProperties: Types.Array<Property>;
}

export const UserSchema = SchemaFactory.createForClass(User);
