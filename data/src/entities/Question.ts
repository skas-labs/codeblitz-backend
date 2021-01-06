import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUrl, MaxLength } from 'class-validator';
import { BaseEntity } from './BaseEntity';

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  text: string;

  @Column({ nullable: true })
  @IsUrl()
  image?: string;

  @Column({ length: 200 })
  @MaxLength(200)
  title: string;

  @Column('json')
  options: Question.Options;

  @Column('json')
  answers: Question.Answers;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Question {
  export class Option {
    title: string;
    @IsUrl() image?: string;

    constructor(title: string, image?: string) {
      this.title = title;
      this.image = image;
    }
  }

  export class Options {
    a: Option;
    b: Option;
    c: Option;
    d: Option;
  }

  type OptionKey = 'a' | 'b' | 'c' | 'd';

  export class Answers {
    a = false;
    b = false;
    c = false;
    d = false;

    constructor(...keys: OptionKey[]) {
      keys.forEach((value) => (this[value] = true));
    }
  }
}
