import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import { CloudinaryService } from './services/cloudinary.service';

@Global()
@Module({
  providers: [
    {
      provide: 'CLOUDINARY',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { apiKey, apiSecret, cloudName } = configService.cloudinary;
        console.log(configService.cloudinary);
        cloudinary.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        });

        return cloudinary;
      },
      inject: [config.KEY],
    },
    CloudinaryService,
  ],
  exports: ['CLOUDINARY', CloudinaryService],
})
export class CloudinaryModule {}
