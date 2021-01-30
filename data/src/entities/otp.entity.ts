import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { _baseEntity } from './_base.entity';
import { IsNumberString, Length } from 'class-validator';

@Entity('otps')
export class OTP extends _baseEntity {

  @PrimaryGeneratedColumn('uuid')
  nonce: string;

  @Column()
  phno: string;

  @Column({length: 4})
  @Length(4, 4)
  @IsNumberString()
  otp: string;
}
