import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Washroom } from "./Washroom";
import { User } from "./User";
import { ActivityAction } from "../enum/common";

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Washroom)
  @JoinColumn({ name: "washroomId" })
  washroom: Washroom;

  @Column({
    type: "enum",
    enum: ActivityAction,
  })
  action: ActivityAction;
}
