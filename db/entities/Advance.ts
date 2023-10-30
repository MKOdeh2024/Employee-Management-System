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
export type AdvanceState = "waiting" | "accepted" | "rejected"
export type AdvanceType = "normal" | "exceptional" 


@Entity('advances')
export class Advance extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  
  @Column({ type: 'datetime', nullable: false })
  suggestionDate: Date;

  @Column()
  amount: number;

  @Column({nullable: true})
  installmentValue?: number;

  @Column({ nullable: true,type:'text'})
  reason?: string;

  @Column({
    type: "enum",
    enum: ["waiting", "accepted", "rejected"],
    default: "waiting"
})
status: string

@Column({
  type: "enum",
  enum: ["normal", "exceptional" ],
  default: "normal"
})
type: AdvanceType

@ManyToOne(() => Employee, (emp) => emp.advances,{ cascade: true, eager: true })
employee?: number


  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
  
}
