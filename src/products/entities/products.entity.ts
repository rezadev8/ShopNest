import { Basket } from 'src/baskets/entities/baskets';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:false})
  name: string;

  @Column({ type: 'int'  , unique:false})
  price: number;

  @Column({ type: 'varchar' , unique:false })
  description: string;

  @Column({unique:false})
  cover: string;

  @ManyToOne(() => User , user => user.products)
  owner: User;

  @ManyToOne(() => Basket , basket => basket.products)
  basket:Basket

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;
}
