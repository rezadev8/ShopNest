import { ApiProperty } from '@nestjs/swagger';
import { Provider } from 'src/auth/enums/provider.enum';
import { Role } from 'src/auth/enums/role.enum';
import { Post } from 'src/blog/entities/posts';
import { Product } from 'src/products/entities/products.entity';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ description: 'User id', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'rezabahmani.dev@gmail.com',
  })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({
    example: 'Reza',
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    example: '09123456789',
  })
  @Column({ unique: true, type: 'varchar', length: 15, nullable: true })
  phone: number;

  @Column({nullable:true})
  password: string;

  @OneToMany(() => Product, (product) => product.owner, { onDelete: 'CASCADE' })
  products: Product[];

  @OneToMany(() => Post, (post) => post.author, { onDelete: 'CASCADE' })
  posts: Post[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({
    type:'enum',
    nullable:true,
    enum:Provider,
    default:null
  })
  provider:Provider

  @OneToMany(() => Ticket, (ticket) => ticket.user, { onDelete: 'CASCADE' })
  tickets: Ticket[];

  @OneToMany(() => Transaction , transaction => transaction.user , { onDelete: 'CASCADE' })
  transactions:Transaction[]

  @ApiProperty({ example: '2024-10-06T16:40:07.703Z' })
  @CreateDateColumn()
  createdAt: number;

  @ApiProperty({ example: '2024-10-06T16:40:07.703Z' })
  @UpdateDateColumn()
  updatedAt: number;
}
