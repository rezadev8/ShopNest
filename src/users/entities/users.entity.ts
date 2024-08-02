import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:false})
  email: string;
  @Column({unique:true , type: 'varchar', length: 15 , nullable:false})
  phone: number;
  @Column()
  password:string;
  @CreateDateColumn()
  createdAt: number;
  @UpdateDateColumn()
  updatedAt: number;
}
