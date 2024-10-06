import { Role } from 'src/auth/enums/role.enum';
import { Post } from 'src/blog/entities/posts';
import { Product } from 'src/products/entities/products.entity';
import { Ticket } from 'src/tickets/entities/tickets.entitie';
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ unique: true, type: 'varchar', length: 15, nullable: false })
  phone: number;

  @Column()
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

  @OneToMany(() => Ticket, (ticket) => ticket.user, { onDelete: 'CASCADE' })
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;
}
