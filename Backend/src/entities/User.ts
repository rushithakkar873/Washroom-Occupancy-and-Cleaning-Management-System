import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRole } from "../enum/common";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  age: number;

  @Column()
  accessId: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Janitor,
  })
  role: UserRole;
}
