import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';
import { IsEmail, IsMobilePhone } from 'class-validator';
import { BaseEntity } from './_base.entity';

@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Player, (player) => player.user)
  player: Player;

  @IsEmail()
  @Column({ nullable: true })
  email: string;

  @IsMobilePhone('en-IN', { strictMode: true })
  @Column({ nullable: true })
  phoneNumber: string;
}