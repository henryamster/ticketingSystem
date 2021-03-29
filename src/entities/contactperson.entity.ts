import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column()
  okayToContact: boolean;
}
