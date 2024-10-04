import { IsNotEmpty, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreatePostDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MinLength(5, { message: 'Title can not be less than 5 character' })
  title: string;

  @IsNotEmpty()
  @MinLength(5, { message: 'Title can not be less than 5 character' })
  content: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsNotEmpty()
  keyword: string;
}
