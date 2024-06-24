import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { HeroDto } from './hero.dto';
import { HeroService } from './hero.service';
import { Role } from '../role/role.enum';
import { Roles } from '../role/roles.decorator';

@Controller('heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  createHero(@Body() hero: HeroDto) {
    return this.heroService.createHero(hero);
  }

  @Get(':name')
  findHeroByName(@Param('name') name: string) {
    return this.heroService.findHeroByName(name);
  }

  @Get()
  findAllHeroes() {
    return this.heroService.findAllHeroes();
  }

  @Put(':name')
  @Roles(Role.ADMIN)
  updateHero(@Param('name') name: string, @Body() hero: HeroDto) {
    return this.heroService.updateHero(name, hero);
  }

  @Delete(':name')
  @Roles(Role.ADMIN)
  deleteHero(@Param('name') name: string) {
    return this.heroService.deleteHero(name);
  }
}
