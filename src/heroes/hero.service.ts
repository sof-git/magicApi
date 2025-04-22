import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HeroDto } from './hero.dto';
import { Hero, HeroDocument } from './hero.schema';
import { CustomException } from '../common/common.params';
import { CustomHttpStatus } from '../common/httpStatus.enum';
import { diskStorage } from 'multer';
import { join } from 'path';
import { promisify } from 'util';
import { mkdirSync, existsSync, readFile, promises as fsPromises } from 'fs';

const readFileAsync = promisify(readFile);
@Injectable()
export class HeroService {
  constructor(@InjectModel('Hero') private readonly heroModel: Model<Hero>) {}
  getMulterConfig() {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '..', 'uploads');
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    };
  }
  /**
   * Create a new hero
   * @body heroDto Hero data
   * @returns Hero
   * @throws Error if hero already exists or if there is an error creating the hero
   * @param heroDto
   */
  async createHero(
    heroDto: HeroDto,
    file: Express.Multer.File,
  ): Promise<Hero | Error> {
    // Check if a hero with the same name already exists
    const existingHero = await this.heroModel.findOne({ name: heroDto.name });
    if (existingHero) {
      throw new CustomException(
        'Hero already exists',
        CustomHttpStatus.BAD_REQUEST,
      );
    }

    // If a file is uploaded, add its information to the heroDto
    if (file) {
      heroDto.img = {
        url: `/uploads/${file.filename}`, // Relative path for static file serving
        alt: `${heroDto.name} image`,
        data: '',
      };
    }

    // Add timestamps
    heroDto.createdAt = new Date();
    heroDto.updatedAt = new Date();

    try {
      // Create and save the hero in the database
      return await this.heroModel.create(heroDto);
    } catch (error) {
      throw new Error(`Failed to create hero: ${error.message}`);
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
    if (hero.img) {
      const path = join(__dirname, '..', '..', hero.img.url);
      console.log(path);
      const buffer = await readFileAsync(path);
      const imageAsBase64 = buffer.toString('base64');
      hero.img.data = imageAsBase64;
    }
    return hero;
  }

  /**
   * Find all heroes
   * @returns Hero[]
   */
  async findAllHeroes(): Promise<Hero[]> {
    try {
      //fetch all images before returning
      const heroes = await this.heroModel
        .find()
        .select('-__v -img._id -img.id -activeSpell._id -passiveSpell._id');
      const heroesWithImage: Hero[] = await Promise.all(
        heroes.map(async (hero) => {
          if (hero.img && hero.img.url) {
            const path = join(__dirname, '..', '..', hero.img.url); // Adjust the path as needed
            try {
              const buffer = await fsPromises.readFile(path);
              const imageAsBase64 = buffer.toString('base64');
              hero.img.data = imageAsBase64; // Add Base64 data to the hero object
            } catch (err) {
              console.error(
                `Error reading file for hero ${hero.name}:`,
                err.message,
              );
            }
          }
          return hero;
        }),
      );
      return heroesWithImage;
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
  async updateHero(id: any, heroDto: HeroDto): Promise<HeroDocument | Error> {
    const hero = await this.heroModel.findOne({ _id: id });
    if (!hero) {
      throw new CustomException('Hero not found', CustomHttpStatus.NOT_FOUND);
    }
    try {
      return await this.heroModel.findOneAndUpdate({ _id: id }, heroDto, {
        new: true,
      });
    } catch (error) {
      throw new CustomException(
        `Failed to update hero: ${error.message}`,
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
