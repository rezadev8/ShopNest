import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class SearchProductDto {
  @ApiProperty({ example: 'Key', required: true })
  @IsNotEmpty()
  @MinLength(2 , {message:'The minimum number of characters for the product name is 2 characters'})
  productName: string;
}
