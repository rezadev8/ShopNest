import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class SearchBlogDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(2, { message: 'Title can not be less than 2 character' })
  title: string;
  
  @IsOptional()
  @IsNotEmpty()
  @MinLength(2, { message: 'Keyword can not be less than 2 character' })
  keyword: string;
}
