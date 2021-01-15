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
import { BaseEntity } from './BaseEntity';

@Entity('players')
export class Player extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.player, { nullable: true })
  @JoinColumn()
  user?: User;

  @Column()
  isBot?: boolean

  //TODO: add player level

  @ManyToMany(() => Player, (player) => player.following)
  @JoinTable({
    name: 'player_followings',
    joinColumn: { name: 'follower' },
    inverseJoinColumn: { name: 'following' },
  })
  followers: Promise<Player[]>;

  @ManyToMany(() => Player, (player) => player.followers)
  following: Promise<Player[]>;
}
