import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Property } from '../entities/property.entity';
import {
  CreatePropertyDto,
  FilterPropertyDto,
  UpdatePropertyDto,
} from '../dtos/property.dto';
import { User } from '../../users/entities/user.entity';
import { CloudinaryService } from '../../cloudinary/services/cloudinary.service';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
    @InjectModel(User.name) private userModel: Model<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll(params?: FilterPropertyDto) {
    const {
      _end,
      _order,
      _start,
      _sort,
      title_like = '',
      propertyType = '',
    } = params ?? {};

    const filters: FilterQuery<Property> = {};

    if (propertyType !== '') {
      filters.propertyType = propertyType;
    }

    if (title_like) {
      filters.title = { $regex: title_like, $options: 'i' };
    }

    try {
      // const count = await this.propertyModel.countDocuments(filters);
      // res.setHeader('x-total-count', count.toString());
      // res.setHeader('Access-Control-Expose-Headers', 'x-total-count');
      const properties = await this.propertyModel
        .find(filters)
        .limit(_end)
        .skip(_start)
        .sort({ [_sort]: _order })
        .exec();

      return properties;
    } catch (e) {
      throw new NotFoundException('Failed to fetch properties');
    }
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
    const photoUrl = await this.cloudinaryService.uploadImage(photo);
    const newProperty = new this.propertyModel({
      ...data,
      photo: photoUrl.url,
      creator: user._id,
    });

    return newProperty.save();
  }

  async update(id: string, changes: UpdatePropertyDto) {
    const { photo } = changes;
    let photoUrl: any = '';
    if (photo) {
      photoUrl = await this.cloudinaryService.uploadImage(photo);
    }
    const product = this.propertyModel
      .findByIdAndUpdate(
        id,
        { $set: { ...changes, photo: photoUrl?.url ?? photo } },
        { new: true },
      )
      .exec();
    if (!product) {
      throw new NotFoundException(`product ${id} not found`);
    }
    return product;
  }

  async remove(id: string) {
    const product = await this.propertyModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }
}
