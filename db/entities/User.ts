import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne,JoinColumn, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./Role.js";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  userName: string;

  @Column({ nullable: false })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
  @Column({ nullable: false })
  password: string;

  @ManyToMany(() => Role, { cascade: true, eager: true })
  @JoinTable()
  roles: Role[];

  // @OneToOne(() => Profile)
  // profile: Profile
  
  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}