import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player.entity";
import { _baseEntity } from "./_base.entity";

@Entity('match_requests')
export class MatchRequest extends _baseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player)
  player: Player;
}
