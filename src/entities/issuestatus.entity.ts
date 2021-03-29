import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IssueStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  statusName: string;

  @Column()
  statusDescription: string;
}
