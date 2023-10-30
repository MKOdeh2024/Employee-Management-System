import { BaseEntity, Column, CreateDateColumn, OneToOne, Entity, PrimaryGeneratedColumn, Relation } from "typeorm";


@Entity('adminProfile')
export class AdminProfile extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  name: string

  @Column({ nullable: false })
  employeeId: number

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}