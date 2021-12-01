import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

export enum GameState {
  CREATED,
  WAITING_PLAYERS,
  STARTED,
  ENDED
}

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

  @Column('enum', { enumName: 'game_state', enum: GameState})
  gameState: GameState
}