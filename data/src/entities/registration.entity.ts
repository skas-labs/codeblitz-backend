import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { _baseEntity } from './_base.entity';
import { IsEmail } from 'class-validator';

@Entity('registration')
export class Registration extends _baseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsEmail()
  @Column({ unique: true })
  email: string;

}