import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { _baseEntity } from './_base.entity';
import { Player } from './player.entity';


@Entity('follow')
export class Follow extends _baseEntity {

  @ManyToOne(() => Player, {primary: true, eager: true})
  follower!: Player;


  @ManyToOne(() => Player, {primary: true, eager: true})
  followee!: Player;


}