import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './Player';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Player, (player) => player.user)
  player: Player;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;
}
