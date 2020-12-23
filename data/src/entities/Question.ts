import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  text: String;

  @Column()
  image: String;

  @Column()
  title: String;
}
