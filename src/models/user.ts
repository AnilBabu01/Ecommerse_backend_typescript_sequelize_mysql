import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from "sequelize-typescript";

export interface UserI{
    userid?: number | null
    first_name: string
    last_name: string
    email: string
    password: string
    otp?:number|null
}

@Table(
    {
        tableName: "users",
        timestamps: true
    }
)

export  class User extends Model implements UserI{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    userid?: number
    
    @AllowNull(false)
    @NotEmpty
    @Column
    first_name!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    last_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;

    @AllowNull(true)
    @NotEmpty
    @Column
    otp!: number;

}