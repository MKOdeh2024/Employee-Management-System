import { BaseEntity,OneToMany, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Employee } from "./Employee.js";

@Entity('sections')
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;


  @OneToMany(type => Employee, emp => emp.section,{ cascade: true, eager: true })
  employees: Relation<Employee>[];
  


  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
  
}
