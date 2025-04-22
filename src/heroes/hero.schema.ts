import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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

@Schema()
export class Image {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  alt: string;

  @Prop()
  data: string;
}

const ActiveSpellSchema = SchemaFactory.createForClass(ActiveSpell);
const PassiveSpellSchema = SchemaFactory.createForClass(PassiveSpell);

@Schema({ toObject: { virtuals: true }, toJSON: { virtuals: true } })
export class Hero {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  img: Image;

  @Prop({ required: true, type: ActiveSpellSchema })
  activeSpell: ActiveSpell;

  @Prop({ required: true, type: PassiveSpellSchema })
  passiveSpell: PassiveSpell;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const heroSchema = SchemaFactory.createForClass(Hero);
