import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v2 } from 'cloudinary';
import config from '../config';
import { CloudinaryService } from './services/cloudinary.service';

@Module({
  providers: [
    {
      provide: 'CLOUDINARY',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { apiKey, apiSecret, cloudName } = configService.cloudinary;
        return v2.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        });
      },
      inject: [config.KEY],
    },
    CloudinaryService,
  ],
  exports: ['CLOUDINARY', CloudinaryService],
})
export class CloudinaryModule {}
