import { Product } from 'src/products/entities/products.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('transactions')
export class Transaction {
  @ApiProperty({ example: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ApiProperty({ example: 'DMKSD25-SAMSA56-SAKMSAK'})
  @Column()
  token: string;

  @JoinTable()
  @ManyToMany(() => Product)
  products: Product[];

  @ApiProperty({ example: 1000})
  @Column()
  amount:number;

  @ApiProperty({ example: Status.PENDING , type:'enum' , enum:Status })
  @Column({type:'enum' , enum:Status , default:Status.PENDING})
  status:Status;

  @ApiProperty({ example: '2024-10-06T16:40:07.703Z' })
  @CreateDateColumn()
  createdAt: number;

  @ApiProperty({ example: '2024-10-06T16:40:07.703Z' })
  @UpdateDateColumn()
  updatedAt: number;
}
