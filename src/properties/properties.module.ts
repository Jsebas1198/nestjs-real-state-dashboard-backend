import { Module } from '@nestjs/common';
import { PropertiesService } from './services/properties.service';
import { PropertiesController } from './controllers/properties.controller';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
