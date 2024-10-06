import { ApiProperty } from '@nestjs/swagger';
import { BasketProduct } from 'src/baskets/entities/basket-product';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Keyborad' })
  @Column({ unique: false })
  name: string;

  @ApiProperty({ example: 32 })
  @Column({ type: 'int', unique: false })
  price: number;

  @ApiProperty({ example: 'This keyboard was made by Super Man and it emits lasers from its buttons' })
  @Column({ type: 'varchar', unique: false })
  description: string;

  @ApiProperty({ example: '/keyboard.png' })
  @Column({ unique: false })
  cover: string;

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany(() => BasketProduct, (basketProduct) => basketProduct.product, {
    onDelete: 'CASCADE',
  })
  basketProducts: BasketProduct[];

  @ApiProperty({ example: '2024-10-06T16:40:07.703Z' })
  @CreateDateColumn()
  createdAt: number;

  @ApiProperty({ example: '2024-10-06T16:40:07.703Z' })
  @UpdateDateColumn()
  updatedAt: number;
}
