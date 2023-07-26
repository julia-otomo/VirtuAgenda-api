import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Contact from "./contact.entity";

@Entity("userDetails")
class UserDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 80 })
  email: string;

  @Column({ type: "varchar", length: 12 })
  phone: string;

  @ManyToOne(() => User, (user) => user.details, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Contact, (contact) => contact.details, {
    onDelete: "CASCADE",
  })
  contact: Contact;
}

export default UserDetails;
