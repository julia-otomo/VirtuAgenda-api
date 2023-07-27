import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user.entity";

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

  @Column({ type: "varchar", length: 80, unique: true })
  email: string;

  @Column({ type: "varchar", length: 12, unique: true })
  phone: string;

  @ManyToMany(() => User, (user) => user.contacts)
  @JoinTable()
  users: User[];
}

export default Contact;
