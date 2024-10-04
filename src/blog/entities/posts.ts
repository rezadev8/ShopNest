import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title:string;

  @Column()
  content:string;

  @Column()
  thumbnail:string;

  @Column()
  keyword:string;

  @ManyToOne(() => User , user => user.posts)
  author:User;

  @CreateDateColumn()
  createdAt:string;
  
  @UpdateDateColumn()
  updatedAt: number;
}
