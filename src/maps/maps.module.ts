import { Module } from '@nestjs/common';
import { MapService } from './maps.service';
import { Map, MapSchema } from './maps.schema';
import { MapController } from './maps.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: Map.name, schema: MapSchema }])],
  controllers: [MapController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    MapService,
  ],
})
export class MapsModule {}
