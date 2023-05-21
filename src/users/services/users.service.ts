import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers() {
    try {
      return await this.userModel.find().exec();
    } catch (err) {
      throw new NotFoundException(`There was a problem: ${err}`);
    }
  }

  async findOne(id: string) {
    const product = await this.userModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    return newModel.save();
  }
}
