import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { _baseEntity } from './_base.entity';
import { Player } from './player.entity';


@Entity('follow')
export class Follow extends _baseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Player, {primary: true})
  follower!: Player;


  @ManyToOne(() => Player, {primary: true})
  followee!: Player;


}