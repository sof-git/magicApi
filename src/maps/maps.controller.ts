import { Body, Controller, Post } from '@nestjs/common';
import { MapService } from './maps.service';
import { MapDto } from './maps.dto';
@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  // Create a new map
  // @param mapData Map data
  // @returns Map
  // @throws Error if map already exists or if there is an error creating the map

  @Post()
  createMap(@Body() mapData: MapDto) {
    return this.mapService.createMap(mapData);
  }
}
