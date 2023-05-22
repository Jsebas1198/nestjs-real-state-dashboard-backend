import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, FilterUserDto } from '../dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @ApiOperation({
    summary: 'List of users',
  })
  findAll(@Query() params: FilterUserDto) {
    return this.usersService.getAllUsers(params);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
}
