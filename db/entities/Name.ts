import { Column } from "typeorm"

export class Name {
    @Column({  nullable: false})
    first: string

    @Column({  nullable: false })
    mid: string

    @Column({ nullable: false })
    last: string
}
