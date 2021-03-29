import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  Column,
} from 'typeorm';
import { IssueTrail } from './issuetrail.entity';
import { IssueStatus } from './issuestatus.entity';

@Entity()
export class ResolutionAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => IssueTrail, (issueTrail) => issueTrail.resolutionAttempts)
  issueTrail: IssueTrail;

  @OneToOne(() => IssueStatus)
  beginningStatus: IssueStatus;

  @OneToOne(() => IssueStatus)
  endingStatus: IssueStatus;

  @Column()
  createdOn: Date;

  @Column()
  diagnosis: string;

  @Column()
  nextStep: string;

  @Column()
  employee: number;
}
