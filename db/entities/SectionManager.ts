import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
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
import { Name } from "./Name.js";

@Entity('section_managers')
export class SectionManager extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column(() => Name)
  name: Name

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
  
}
