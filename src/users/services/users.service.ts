import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto, FilterUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(params?: FilterUserDto) {
    if (params) {
      const { _start, _end } = params;
      return await this.userModel.find().skip(_start).limit(_end).exec();
    }
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .populate('allProperties')
      .exec();
    if (!user) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const { email } = data;

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      return existingUser; // or you can return an appropriate response indicating that the email already exists
    }

    const newUser = new this.userModel(data);
    return newUser.save();
  }
}
