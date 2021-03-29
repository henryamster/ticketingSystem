import { IsInt, Min } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { Issue } from './issue.entity';
import { ResolutionAttempt } from './resolutionattempt.entity';

@Entity()
export class IssueTrail {
  @PrimaryGeneratedColumn()
  @IsInt()
  @Min(1)
  id: number;

  @OneToOne(() => Issue)
  @JoinColumn()
  issue: Issue;

  @OneToMany(
    () => ResolutionAttempt,
    (resoltuionAttempt) => resoltuionAttempt.issueTrail,
  )
  resolutionAttempts: ResolutionAttempt[];

  @Column()
  resolved: boolean;
}
