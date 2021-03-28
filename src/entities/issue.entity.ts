import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TableForeignKey,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ContactPerson } from './contactperson.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ContactPerson)
  contactPersonId: ContactPerson;

  @Column()
  createdOn: Date;
}
