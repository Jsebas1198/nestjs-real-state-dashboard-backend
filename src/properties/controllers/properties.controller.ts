import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Res,
  Header,
} from '@nestjs/common';
import { Response } from 'express';
import { PropertiesService } from '../services/properties.service';
import {
  CreatePropertyDto,
  FilterPropertyDto,
  UpdatePropertyDto,
} from '../dtos/property.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}
  @Get()
  @Header('x-total-count', '0') // Set a default value for the header
  @Header('Access-Control-Expose-Headers', 'x-total-count')
  async getProducts(@Query() params: FilterPropertyDto, @Res() res: Response) {
    const properties = await this.propertiesService.findAll(params);
    res.set('x-total-count', properties.length.toString());
    return properties;
  }
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.propertiesService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreatePropertyDto) {
    return this.propertiesService.create(payload);
  }

  @Put(':productId')
  update(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(productId, payload);
  }

  @Delete(':productId')
  delete(@Param('productId', MongoIdPipe) productId: string) {
    return this.propertiesService.remove(productId);
  }
}
