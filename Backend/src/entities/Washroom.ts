import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { WashroomStatus } from "../enum/common";


@Entity()
export class Washroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: "enum",
    enum: WashroomStatus,
    default: WashroomStatus.Available,
  })
  status: WashroomStatus;
}
