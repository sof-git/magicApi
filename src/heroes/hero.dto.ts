import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
  IsInt,
  Min,
  IsDate,
  IsOptional,
} from 'class-validator';
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

export class ImageDto {
  @IsString()
  url: string;

  @IsString()
  alt: string;
}

export class HeroDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => PassiveSpellDto)
  @ValidateNested()
  passiveSpell: PassiveSpellDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ActiveSpellDto)
  activeSpell: ActiveSpellDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImageDto)
  img: ImageDto;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
