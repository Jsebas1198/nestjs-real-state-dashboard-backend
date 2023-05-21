import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Property extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  propertyType: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  photo: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  creator: User | Types.ObjectId;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
