import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  text: string;

  @Column()
  image: string;

  @Column()
  title: string;
}
