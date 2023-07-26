import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import UserDetails from "./userDetails.entity";
import User from "./user.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "text", nullable: true })
  image: string | null | undefined;

  @CreateDateColumn({ type: "date" })
  addedAt: string;

  @OneToMany(() => UserDetails, (userDetails) => userDetails.contact)
  details: UserDetails[];

  @ManyToMany(() => User, (user) => user.contacts)
  @JoinTable()
  users: User[];
}

export default Contact;
