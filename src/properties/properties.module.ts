import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertiesService } from './services/properties.service';
import { PropertiesController } from './controllers/properties.controller';
import { Property, PropertySchema } from './entities/property.entity';
import { UsersModule } from '../users/users.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    UsersModule,
    CloudinaryModule,
    MongooseModule.forFeature([
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
