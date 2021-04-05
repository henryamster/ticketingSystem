import { IsInt, Min } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IssueStatus {
  @PrimaryGeneratedColumn()
  @IsInt()
  @Min(1)
  id: number;

  @Column()
  statusName: string;

  @Column()
  statusDescription: string;
}
export interface IIssueStatusSearch {
  id?: number;
  statusName?: string;
  statusDescription?: string;
}
