import { BaseEntity,ManyToOne, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from "typeorm";
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
} from "class-validator"
import { Employee } from "./Employee.js";
import { Section } from "./Section.js";
export type LeavePermissionState = "waiting" | "accepted" | "rejected"

@Entity('leavePermissions')
export class LeavePermission extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date', nullable: false })
  leaveDate: Date;

  @Column({ nullable: false })
  leaveHour: number;

  @Column({ nullable: false })
  date: Date;


  @Column()
  duration: number;

  @Column({ nullable: true,type:'text'})
  reason: string;

  @Column({
    type: "enum",
    enum: ["waiting", "accepted", "rejected"],
    default: "waiting"
})
status: string


@ManyToOne(() => Employee, (emp) => emp.leavePermissions, { cascade: true, eager: true })
employee?: number

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
  
}
