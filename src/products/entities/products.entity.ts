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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  name: string;

  @Column({ type: 'int', unique: false })
  price: number;

  @Column({ type: 'varchar', unique: false })
  description: string;

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

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;
}
