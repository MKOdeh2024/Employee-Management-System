import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee.js";


@Entity('complaints')
export class Complaint extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ nullable: true,type:'text'})
  content: string;

  @Column({ nullable: true,type:'text'})
  subject: string;

  @ManyToOne(() => Employee, (emp) => emp.complaints, { cascade: true, eager: true })
  employee?: number

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
  
}
