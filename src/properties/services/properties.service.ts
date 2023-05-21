import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto, FilterPropertyDto } from '../dtos/property.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll(params?: FilterPropertyDto) {
    if (params) {
      const filters: FilterQuery<Property> = {};
      const { limit, offset, minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        filters.price = {
          $gte: minPrice,
          $lte: maxPrice,
        };
      }
      return this.propertyModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.propertyModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return property;
  }

  async create(data: CreatePropertyDto) {
    const { email, photo } = data;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newProperty = new this.propertyModel({
      ...data,
      creator: user._id, // Set the creator as the user's ID
    });

    return newProperty.save();
  }
}
