import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HeroDto } from './hero.dto';
import { Hero, HeroDocument } from './hero.schema';
import { CustomException } from '../common/common.params';
import { CustomHttpStatus } from '../common/httpStatus.enum';

@Injectable()
export class HeroService {
  constructor(@InjectModel('Hero') private readonly heroModel: Model<Hero>) {}

  /**
   * Create a new hero
   * @body heroDto Hero data
   * @returns Hero
   * @throws Error if hero already exists or if there is an error creating the hero
   * @param heroDto
   */
  async createHero(heroDto: HeroDto): Promise<Hero | Error> {
    const existingHero = await this.heroModel.findOne({ name: heroDto.name });
    if (existingHero) {
      throw new CustomException(
        'Hero already exists',
        CustomHttpStatus.BAD_REQUEST,
      );
    }
    try {
      return await this.heroModel.create(heroDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Find a hero by name
   * @param name Hero name
   * @returns Hero
   * @throws Error if hero does not exist
   * @param name
   * @returns Promise<Hero> | Promise<Error>
   */
  async findHeroByName(name: string): Promise<HeroDocument> {
    const hero = await this.heroModel.findOne({ name });
    if (!hero) {
      throw new CustomException('Hero not found', CustomHttpStatus.NOT_FOUND);
    }
    return hero;
  }

  /**
   * Find all heroes
   * @returns Hero[]
   */
  async findAllHeroes(): Promise<HeroDocument[]> {
    try {
      return await this.heroModel.find();
    } catch (error) {
      throw new CustomException(
        'Error fetching heroes',
        CustomHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Update a hero
   * @param name Hero name
   * @param heroDto Hero data
   * @returns Hero
   * @throws Error if hero does not exist or if there is an error updating the hero
   * @param name
   * @param heroDto
   * @returns Promise<Hero> | Promise<Error>
   */
  async updateHero(
    name: string,
    heroDto: HeroDto,
  ): Promise<HeroDocument | Error> {
    const hero = await this.heroModel.findOne({ name });
    if (!hero) {
      throw new CustomException('Hero not found', CustomHttpStatus.NOT_FOUND);
    }
    try {
      return await this.heroModel.findOneAndUpdate({ name }, heroDto, {
        new: true,
      });
    } catch (error) {
      throw new CustomException(
        'Internal server error',
        CustomHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Delete a hero
   * @param name Hero name
   * @returns void
   * @throws Error if hero does not exist or if there is an error deleting the hero
   * @param name
   * @returns Promise<void> | Promise<Error>
   */

  async deleteHero(name: string): Promise<void | Error> {
    const hero = await this.heroModel.findOne({ name });
    if (!hero) {
      throw new CustomException('Hero not found', CustomHttpStatus.NOT_FOUND);
    }
    try {
      await this.heroModel.deleteOne({ name });
    } catch (error) {
      throw new CustomException(
        'Internal server error',
        CustomHttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
