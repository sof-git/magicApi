import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './cards/card.module';
import { HeroModule } from './heroes/hero.module';
import { MapsModule } from './maps/maps.module';
const mongoURI = 'mongodb://localhost:27017/my-game';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(mongoURI),
    UserModule,
    AuthModule,
    CardModule,
    HeroModule,
    MapsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
