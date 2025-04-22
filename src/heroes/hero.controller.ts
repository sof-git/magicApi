import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { Role } from '../role/role.enum';
import { Roles } from '../role/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // Limit to 10 MB
      },
    }),
  )
  async createHero(
    @UploadedFile() file: Express.Multer.File,
    @Body('hero') heroJson: string, // Parse hero JSON from the request body
  ) {
    try {
      const heroDto = JSON.parse(heroJson);
      // Call the service and pass both the parsed hero and the file
      const newHero = await this.heroService.createHero(heroDto, file);

      return {
        statusCode: 201,
        message: 'Hero created successfully',
        data: newHero,
      };
    } catch (error) {
      throw new Error(`Error creating hero: ${error.message}`);
    }
  }

  @Get(':name')
  findHeroByName(@Param('name') name: string) {
    return this.heroService.findHeroByName(name);
  }

  @Get()
  findAllHeroes() {
    return this.heroService.findAllHeroes();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // Limit to 10 MB
      },
    }),
  )
  @Roles(Role.ADMIN)
  updateHero(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: any,
    @Body('hero') hero: string,
  ) {
    try {
      const parsedHero = JSON.parse(hero);
      // Call the service and pass the parsed hero
      return this.heroService.updateHero(id, parsedHero);
    } catch (error) {
      throw new Error(`Error updating hero: ${error.message}`);
    }
  }

  @Delete(':name')
  @Roles(Role.ADMIN)
  deleteHero(@Param('name') name: string) {
    return this.heroService.deleteHero(name);
  }
}
