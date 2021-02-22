import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { _baseEntity } from './_base.entity';
import { IsNumberString, Length, IsDate } from 'class-validator';

@Entity('otps')
export class OTP extends _baseEntity {

  @PrimaryGeneratedColumn('uuid')
  nonce: string;

  @Column()
  @IsNumberString()
  phno: string;

  @Column({length: 6})
  @Length(6, 6)
  @IsNumberString()
  otp: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  @IsDate()
  verified_at: Date;

}
