import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { User } from './user.entity';
import { _baseEntity } from './_base.entity';
import { Follow } from './follow.entity';

@Entity('players')
export class Player extends _baseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.player, {nullable: true})
  @JoinColumn()
  user?: User;

  @Column()
  isBot?: boolean;

  //TODO: add player level

  @OneToMany(() => Follow, follow => follow.followee)
  followers: () => Promise<Follow[]>;

  @OneToMany(() => Follow, follow => follow.follower)
  following: () => Promise<Follow[]>;

}
