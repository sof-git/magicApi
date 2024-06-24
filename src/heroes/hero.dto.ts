import { IsString, IsNotEmpty } from 'class-validator';
import { cardType } from '../cards/card.enum';

export class HeroDto {
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
  passiveSpell: string;

  @IsNotEmpty()
  @IsString()
  activeSpell: string;
}
