import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CardDto } from './card.dto';
import { CardService } from './card.service';
import { Role } from '../role/role.enum';
import { Roles } from '../role/roles.decorator';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @Roles(Role.ADMIN)
  createCard(@Body() card: CardDto) {
    return this.cardService.createCard(card);
  }

  @Get(':name')
  @Roles(Role.ADMIN, Role.PLAYER)
  findCardByName(@Param('name') name: string) {
    return this.cardService.findCardByName(name);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PLAYER)
  findAllCards() {
    return this.cardService.findAllCards();
  }

  @Put(':name')
  @Roles(Role.ADMIN)
  updateCard(@Param('name') name: string, @Body() card: CardDto) {
    return this.cardService.updateCard(name, card);
  }

  @Delete(':name')
  @Roles(Role.ADMIN)
  deleteCard(@Param('name') name: string) {
    return this.cardService.deleteCard(name);
  }
}
