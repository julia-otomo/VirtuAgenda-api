import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity("userDetails")
class UserDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 80, unique: true, nullable: true })
  email: string | null | undefined;

  @Column({ type: "varchar", length: 12, unique: true, nullable: true })
  phone: string | null | undefined;

  @Column({ type: "varchar", length: 50, nullable: true })
  contactTitle: string | null | undefined;

  @ManyToOne(() => User, (user) => user.details, { onDelete: "CASCADE" })
  user: User;
}

export default UserDetails;
