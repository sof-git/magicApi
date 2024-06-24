import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CardCost } from './card.enum';
export type CardDocument = HydratedDocument<Card>;
@Schema({ toObject: { virtuals: true }, toJSON: { virtuals: true } })
export class Card {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  element: string;

  @Prop()
  attack: number;

  @Prop()
  life: number;

  @Prop({ required: true, type: Object }) // Ensure type is specified as Object
  cost: CardCost;

  @Prop()
  effect: string;

  @Prop(
    raw({
      path: { type: String, required: true },
      content_type: { type: String, required: true, alias: 'contentType' },
    }),
  )
  img: Record<string, any>;
}

export const CardSchema = SchemaFactory.createForClass(Card);
