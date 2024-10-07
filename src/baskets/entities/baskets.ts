import { User } from 'src/users/entities/users.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BasketProduct } from './basket-product';
import { ApiProperty } from '@nestjs/swagger';

@Entity('baskets')
export class Basket {
  @ApiProperty({ description: 'Basket id', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => BasketProduct, (basketProduct) => basketProduct.basket, {
    onDelete: 'CASCADE',
  })
  basketProducts: BasketProduct[];

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;
}
