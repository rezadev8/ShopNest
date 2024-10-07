import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Hello world' })
  @IsNotEmpty()
  @MinLength(5, { message: 'Title can not be less than 5 character' })
  title: string;

  @ApiProperty({ example: 'Are you the world or me?' })
  @IsNotEmpty()
  @MinLength(5, { message: 'Title can not be less than 5 character' })
  content: string;

  @ApiProperty({ example: '/world.png' })
  @IsNotEmpty()
  thumbnail: string;
  
  @ApiProperty({ example: 'me , world' })
  @IsNotEmpty()
  keyword: string;
}
