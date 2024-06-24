import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { cardType } from 'src/cards/card.enum';

export type HeroDocument = HydratedDocument<Hero>;
@Schema({ toObject: { virtuals: true }, toJSON: { virtuals: true } })
export class Hero {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: cardType;

  @Prop({ required: true })
  passiveSpell: string;

  @Prop({ required: true })
  activeSpell: string;
}
export const HeroSchema = SchemaFactory.createForClass(Hero);
