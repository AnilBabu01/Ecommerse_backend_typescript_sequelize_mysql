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
} from "sequelize-typescript";

import { Order } from "./order";

export interface orderitemsI {
  orderitemid?: number | null;
  name: string;
  quantity: number;
  image: string;
  price: number;
  orderid?: number | null;
}

@Table({
  tableName: "orderitems",
  timestamps: true,
})
export class Orderitems extends Model implements orderitemsI {
  @AutoIncrement
  @PrimaryKey
  @Column
  orderitemid?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  quantity!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  image!: string;

  @AllowNull(true)
  @NotEmpty
  @Default(0)
  @Column
  price!: number;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => Order)
  @Column
  orderid!: number;
}
