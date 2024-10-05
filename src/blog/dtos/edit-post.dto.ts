import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class EditPostDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title can not be less than 5 character' })
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title can not be less than 5 character' })
  content: string;

  @IsOptional()
  @IsNotEmpty()
  thumbnail: string;
  
  @IsOptional()
  @IsNotEmpty()
  keyword: string;
}
