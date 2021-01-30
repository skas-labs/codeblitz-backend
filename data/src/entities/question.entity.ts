import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUrl, MaxLength } from 'class-validator';
import { BaseEntity } from './_base.entity';

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', {default: ''})
  text?: string;

  @Column({nullable: true})
  @IsUrl()
  image?: string;

  @Column({length: 200})
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

  type OptionKey = 'a' | 'b' | 'c' | 'd';

  export class Options {
    a: Option;
    b: Option;
    c: Option;
    d: Option;

    constructor(textOptions: { [k in OptionKey]: string }) {
      this.a = {title: textOptions['a']};
      this.b = {title: textOptions['b']};
      this.c = {title: textOptions['c']};
      this.d = {title: textOptions['d']};
    }
  }


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
