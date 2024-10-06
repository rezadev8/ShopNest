import { User } from 'src/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => User, (user) => user.tickets, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'longtext' })
  text: string;

  @Column()
  chatId: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
