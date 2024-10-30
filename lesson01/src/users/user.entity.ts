import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // This will create a 'users' table
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;
}
