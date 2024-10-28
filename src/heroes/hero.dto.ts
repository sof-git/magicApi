import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { cardType } from '../cards/card.enum';
import {
  spellsTypes,
  spellsTarget,
  spellsDuration,
  spellsEffect,
} from '../types/spells.enum';
import { Type } from 'class-transformer';

export class ActiveSpellDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(spellsTypes)
  type: spellsTypes;

  @IsNotEmpty()
  @IsEnum(spellsTarget)
  target: spellsTarget;

  @IsNotEmpty()
  @IsEnum(spellsDuration)
  duration: spellsDuration;

  @IsNotEmpty()
  @IsEnum(spellsEffect)
  effect: spellsEffect;

  @IsInt()
  @Min(1)
  value: number;
}

export class PassiveSpellDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(spellsTypes)
  type: spellsTypes;

  @IsNotEmpty()
  @IsEnum(spellsTarget)
  target: spellsTarget;

  @IsNotEmpty()
  @IsEnum(spellsDuration)
  duration: spellsDuration;

  @IsNotEmpty()
  @IsEnum(spellsEffect)
  effect: spellsEffect;

  @IsInt()
  @Min(1)
  value: number;
}

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
  @Type(() => PassiveSpellDto)
  @ValidateNested()
  passiveSpell: PassiveSpellDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ActiveSpellDto)
  activeSpell: ActiveSpellDto;
}
