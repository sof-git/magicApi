import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { CardCost, cardElement, cardType } from './card.enum';

export class CardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  type: cardType;

  @IsNotEmpty()
  @IsString()
  element: cardElement;

  @IsNumber()
  attack: number;

  @IsNumber()
  life: number;

  @IsString()
  effect: string;

  @IsObject()
  @IsEnum(cardElement, { each: true })
  @IsNumber({}, { each: true })
  cost: CardCost;
}
