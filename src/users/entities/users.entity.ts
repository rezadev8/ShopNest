import { Basket } from 'src/baskets/entities/baskets';
import { Post } from 'src/blog/entities/posts';
import { Product } from 'src/products/entities/products.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ unique: true, type: 'varchar', length: 15, nullable: false })
  phone: number;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.owner)
  products: Product[];

  @OneToMany(() => Post , post => post.author)
  posts:Post[]

  @CreateDateColumn()
  createdAt: number;
  
  @UpdateDateColumn()
  updatedAt: number;
}
