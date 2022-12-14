import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
  HasMany,
} from "sequelize-typescript";
import { Order } from "./order";
export interface UserI {
  userid?: number | null;
  name: string;
  email: string;
  password: string;
  otp?: number | null;
  role?: String;
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
  @Default("user")
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

  @HasMany(() => Order, "userid")
  orders!: Order;
}
