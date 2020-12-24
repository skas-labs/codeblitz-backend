import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.player, { nullable: true })
  @JoinColumn()
  user?: User;

  //TODO: add bot

  @ManyToMany(() => Player, (player) => player.following)
  @JoinTable({
    name: 'player_followings',
    joinColumn: { name: 'follower' },
    inverseJoinColumn: { name: 'following' },
  })
  followers: Player[];

  @ManyToMany(() => Player, (player) => player.followers)
  following: Player[];
}
