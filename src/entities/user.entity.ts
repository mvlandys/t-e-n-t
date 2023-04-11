import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Exclude } from "class-transformer";
import { BaseEntity } from "./base.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;
}