import { Column, Entity, ManyToOne } from 'typeorm';
import { Player } from './Player';

@Entity('game_sessions')
export class GameSession {

  @ManyToOne(() => Player)
  @Column()
  player1?: Player;

  @ManyToOne(() => Player)
  @Column()
  player2?: Player;
}