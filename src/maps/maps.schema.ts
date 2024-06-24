import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Map {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  theme: string;

  @Prop({ required: true, type: Object })
  background: Record<string, any>;
}

export const MapSchema = SchemaFactory.createForClass(Map);
