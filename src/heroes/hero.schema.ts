import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { cardType } from 'src/cards/card.enum';
import {
  spellsTypes,
  spellsTarget,
  spellsDuration,
  spellsEffect,
} from 'src/types/spells.enum';

export type HeroDocument = HydratedDocument<Hero>;

@Schema()
export class ActiveSpell {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: spellsTypes })
  type: spellsTypes;

  @Prop({ required: true, enum: spellsTarget })
  target: spellsTarget;

  @Prop({ required: true, enum: spellsDuration })
  duration: spellsDuration;

  @Prop({ required: true, enum: spellsEffect })
  effect: spellsEffect;

  @Prop({ required: true })
  value: number;
}

@Schema()
export class PassiveSpell {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: spellsTypes })
  type: spellsTypes;

  @Prop({ required: true, enum: spellsTarget })
  target: spellsTarget;

  @Prop({ required: true, enum: spellsDuration })
  duration: spellsDuration;

  @Prop({ required: true, enum: spellsEffect })
  effect: spellsEffect;

  @Prop({ required: true })
  value: number;
}

const ActiveSpellSchema = SchemaFactory.createForClass(ActiveSpell);
const PassiveSpellSchema = SchemaFactory.createForClass(PassiveSpell);

@Schema({ toObject: { virtuals: true }, toJSON: { virtuals: true } })
export class Hero {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: cardType })
  type: cardType;

  @Prop({ required: true, type: ActiveSpellSchema })
  activeSpell: ActiveSpell;

  @Prop({ required: true, type: PassiveSpellSchema })
  passiveSpell: PassiveSpell;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
