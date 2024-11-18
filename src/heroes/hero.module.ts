import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { Hero, heroSchema } from './hero.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from '../auth/auth.guard';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: heroSchema }]),
  ],
  controllers: [HeroController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    HeroService,
  ],
  exports: [HeroService, MongooseModule],
})
export class HeroModule {}
