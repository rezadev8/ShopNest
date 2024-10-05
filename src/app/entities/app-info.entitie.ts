import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('app-info')
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column()
  keyword:string;

  @Column()
  url:string;

  @Column()
  email:string;

  @Column()
  logo:string;

  @Column()
  description:string;

  @Column()
  themeColor:string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: number;
}
