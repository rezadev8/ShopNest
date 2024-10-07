import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class EditPostDto {
  @ApiProperty({example:'Both of you are the world' , required:false})
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title can not be less than 5 character' })
  title: string;

  @ApiProperty({example:'Are you serious?' , required:false})
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title can not be less than 5 character' })
  content: string;

  @ApiProperty({example:'Yes' , required:false})
  @IsOptional()
  @IsNotEmpty()
  thumbnail: string;
  
  @ApiProperty({example:'Thanks' , required:false})
  @IsOptional()
  @IsNotEmpty()
  keyword: string;
}
