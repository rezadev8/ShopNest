import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditProductDto {
  @ApiProperty({ example: 'Mouse', required:false })
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 22, required:false })
  @IsOptional()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'This mouse is made by my spider and it spins itself' , required:false })
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '/mouse.png', required:false })
  @IsOptional()
  @IsNotEmpty()
  cover: string;
}
