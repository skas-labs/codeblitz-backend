import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { _baseEntity } from './_base.entity';
import { Player } from './player.entity';


@Entity('follow')
export class Follow extends _baseEntity {

  @ManyToOne(() => Player, {primary: true})
  follower: Player;


  @ManyToOne(() => Player, {primary: true})
  followee: Player;


}