import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./Section.js";
import { Employee } from "./Employee.js";

@Entity('sectionManagerProfils')
export class SectionManagerProfile extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  name: string

  @
  Column({ nullable: false, unique: true })
  section: number
  
  @OneToOne(() => Employee)
  employeeId: number
  

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}