import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { _baseEntity } from './_base.entity';
import { IsUUID } from 'class-validator';
import { User } from './user.entity';


@Entity('auth_tokens')
export class AuthToken extends _baseEntity {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  token: string;

  @ManyToOne(() => User)
  user: User;

}