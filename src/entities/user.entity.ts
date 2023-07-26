import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import UserDetails from "./userDetails.entity";
import Contact from "./contact.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 150 })
  password: string;

  @Column({ type: "text", nullable: true })
  image: string | null | undefined;

  @CreateDateColumn({ type: "date" })
  addedAt: string;

  @OneToMany(() => UserDetails, (userDetails) => userDetails.user)
  details: UserDetails[];

  @ManyToMany(() => Contact, (contact) => contact.users)
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted: number = getRounds(this.password);

    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
