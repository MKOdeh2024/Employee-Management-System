import { BaseEntity,ManyToOne, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Employee } from "./Employee.js";
export type VacationState = "waiting" | "accepted" | "rejected"

@Entity('vacations')
export class Vacation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date', nullable: false })
  suggestionDate: Date;

  @Column({ type: 'numeric', nullable: false })
  duration: number;

  @Column({ nullable: true,type:'text'})
  reason: string;
  
  @Column({
    type: "enum",
    enum: ["sick", "motherhood","other"],nullable:false})
status?: string

  @Column({
    type: "enum",
    enum: ["waiting", "accepted", "rejected"],
    default: "waiting"
,nullable:false})
type: string


    @ManyToOne(() => Employee, (emp) => emp.vacations, { cascade: true, eager: true })
    employee?: number


  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
  
}
