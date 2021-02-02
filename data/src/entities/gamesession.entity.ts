import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity('game_sessions')
export class GameSession {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Player)
  @Column()
  player1?: Player;

  @ManyToOne(() => Player)
  @Column()
  player2?: Player;
}