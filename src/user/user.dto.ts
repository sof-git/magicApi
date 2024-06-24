import { IsNotEmpty, IsString, IsEmail, Min, Max } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @Min(4)
  @Max(40)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Min(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
