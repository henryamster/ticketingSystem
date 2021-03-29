import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import { IsInt } from 'class-validator'
@Entity()
export class ContactPerson {
  @PrimaryGeneratedColumn()
  //@IsInt()
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

// export interface ContactPersonInterface extends ContactPerson {
//     id?,

// }