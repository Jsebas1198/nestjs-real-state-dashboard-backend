import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/services/cloudinary.service';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }),
    }),
    HttpModule,
    UsersModule,
    PropertiesModule,
    DatabaseModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
