import { Model } from 'mongoose';
import { Map } from './maps.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MapDto } from './maps.dto';
@Injectable()
export class MapService {
  constructor(@InjectModel('Map') private readonly mapModel: Model<Map>) {}

  /**
   * Create a new map
   * @param mapData Map data
   * @returns Map
   * @throws Error if map already exists or if there is an error creating the map
   */

  async createMap(mapData: MapDto): Promise<Map | Error> {
    try {
      
      return await this.mapModel.create(mapData);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
