import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Basket } from './baskets';
import { Product } from 'src/products/entities/products.entity';

@Entity()
export class BasketProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Basket, basket => basket.basketProducts)
  basket: Basket;

  @ManyToOne(() => Product, product => product.basketProducts)
  product: Product;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}