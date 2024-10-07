import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class SearchBlogDto {
  @ApiProperty({example:'world' , required:false})
  @IsOptional()
  @IsNotEmpty()
  @MinLength(2, { message: 'Title can not be less than 2 character' })
  title: string;
  
  @ApiProperty({example:'me' , required:false})
  @IsOptional()
  @IsNotEmpty()
  @MinLength(2, { message: 'Keyword can not be less than 2 character' })
  keyword: string;
}
