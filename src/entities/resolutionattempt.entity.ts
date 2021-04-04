import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  Column,
} from 'typeorm';
import { IssueTrail } from './issuetrail.entity';
import { IssueStatus } from './issuestatus.entity';
import { IsDate, isInt, IsInt, Min } from 'class-validator';

@Entity()
export class ResolutionAttempt {
  @PrimaryGeneratedColumn()
  @IsInt()
  @Min(1)
  id: number;

  @ManyToOne(() => IssueTrail, (issueTrail) => issueTrail.resolutionAttempts)
  issueTrail: IssueTrail;

  @OneToOne(() => IssueStatus)
  beginningStatus: IssueStatus;

  @OneToOne(() => IssueStatus)
  endingStatus: IssueStatus;

  @Column()
  @IsDate()
  createdOn: Date;

  @Column()
  diagnosis: string;

  @Column()
  nextStep: string;

  @Column()
  employee: string;
}
