import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card, CardSchema } from './card.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from '../auth/auth.guard';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    CardService,
  ],
  exports: [CardService, MongooseModule],
})
export class CardModule {}
