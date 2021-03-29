import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsInt, IsPhoneNumber, Min, MinLength } from 'class-validator';
@Entity()
export class ContactPerson {
  @PrimaryGeneratedColumn()
  @IsInt()
  @Min(1)
  id: number;

  @Column()
  @MinLength(1)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsPhoneNumber()
  phoneNumber?: string;

  @Column()
  okayToContact: boolean;
}

// export interface ContactPersonInterface extends ContactPerson {
//     id?,

// }
