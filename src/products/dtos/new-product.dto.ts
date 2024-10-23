import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewProductDto {
  @ApiProperty({ example: 'Keyboard' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 32 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'This keyboard was made by Super Man and it emits lasers from its buttons' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '/keyboard.png' })
  @IsNotEmpty()
  cover: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  quantity:number;
}
