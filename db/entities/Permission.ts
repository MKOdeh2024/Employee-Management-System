import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,ManyToMany } from "typeorm";
import { Role } from "./Role.js";

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role)
  roles: Role[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}