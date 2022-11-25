import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
} from "sequelize-typescript";

export interface UserI {
  userid?: number | null;
  name: string;
  email: string;
  password: string;
  otp?: number | null;
  role: String;
}

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model implements UserI {
  @AutoIncrement
  @PrimaryKey
  @Column
  userid?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  role!: string;

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
