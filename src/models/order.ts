import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";

import { User } from "./user";

export interface OrderI {
  orderid?: number | null;
  address: string;
  phone: string;
  postalCode: string;
  country: string;
  userid?: number | null;
}
import { Orderitems } from "./orderitems";
@Table({
  tableName: "orders",
  timestamps: true,
})
export class Order extends Model implements OrderI {
  @AutoIncrement
  @PrimaryKey
  @Column
  orderid?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  address!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  phone!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  postalCode!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  country!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column
  userid!: number;

  @HasMany(() => Orderitems, "orderitemid")
  Orderitems!: Orderitems;
}
