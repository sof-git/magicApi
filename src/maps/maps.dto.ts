import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class MapDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  theme: string;

  @IsNotEmpty()
  @IsObject()
  background: {
    src: string;
    type: string;
  };
}
