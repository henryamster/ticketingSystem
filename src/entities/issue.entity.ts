import { IsDate, IsInt, Min, MinDate } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { ContactPerson } from './contactperson.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  @IsInt()
  @Min(1)
  id: number;

  @OneToOne(() => ContactPerson)
  contactPerson: ContactPerson;

  @Column()
  @IsDate()
  createdOn: Date;
}
