import { BaseEntity,OneToMany,ManyToOne,ManyToMany,JoinTable, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation, OneToOne } from "typeorm";
import bcrypt from 'bcrypt'
import { Advance } from "./Advance.js";
import { Vacation } from "./Vacation.js";
import { LeavePermission } from "./LeavePermission.js";
import { Section } from "./Section.js";
import { Role } from "./Role.js";
import { ManagerProfile } from "./ManagerProfile.js";
import { Complaint } from "./Complaint.js";


@Entity('employees')
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false})
  firstName: string;

  @Column({ nullable: false})
  midName: string;

  @Column({ nullable: false})
  lastName: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
  @Column({ nullable: false})
  password: string;

  @Column({ type: 'date', nullable: false })
  DOB: Date;

  @Column({  nullable: false ,unique:true})
  identification: string;

  @Column({  nullable: false ,unique:true})
  phoneNumber: string;

  @Column({ nullable: false , unique:true})
  email: string;

  @Column({ nullable: false })
  salary: number;

  @Column({ nullable: false ,type:'text'})
  city: string;

  @Column({ nullable: false,type:'text'})
  street: string;


@Column({
  type: "set",
  enum: ["male","female"],nullable:false
})
gender: string

@Column({
  type: "set",
  enum: ["married","single"],nullable:false
})
status: string

  @Column({    type: 'timestamp', 
  precision: 3,
})
  logoutAt: Date;

  @Column()
  passwordChangedAt: Date;

  @Column({ default:0})
  leaveHours: number;

  @Column({ default:14})
  vacationDays: number;

  @OneToMany(type => Advance, advance => advance.employee)
    advances: number[];

    @OneToMany(type => Vacation, vacation => vacation.employee)
    vacations: number[];

    @OneToMany(type => LeavePermission, leave => leave.employee)
    leavePermissions:  number[];

    @OneToMany(type => Complaint, complaint => complaint.employee)
    complaints: number[];

    @ManyToOne(() => Section, (sec) => sec.employees)
  section?: number

  @ManyToMany(() => Role, { cascade: true, eager: true })
  @JoinTable()
  roles: Role[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}