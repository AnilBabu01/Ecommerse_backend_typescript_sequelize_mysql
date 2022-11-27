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
  DataType,
} from "sequelize-typescript";

import { User } from "./user";

export interface OrderI {
  orderid?: number | null;
  address: string;
  phone: string;
  postalCode: string;
  country: string;
  paidAt: any;
  itemsPrice?: number | null;
  taxPrice?: number | null;
  shippingPrice?: number | null;
  totalPrice?: number | null;
  orderStatus: string;
  deliveredAt: any;
  userid?: number | null;
}
import { Orderitems } from "./orderitems";
import { Paymentinfo } from "./paymentinfo";
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
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  paidAt!: any;

  @AllowNull(false)
  @NotEmpty
  @Default(0.0)
  @Column
  itemsPrice?: number;

  @AllowNull(false)
  @NotEmpty
  @Default(0.0)
  @Column
  taxPrice?: number;

  @AllowNull(false)
  @NotEmpty
  @Default(0.0)
  @Column
  shippingPrice?: number;

  @AllowNull(false)
  @NotEmpty
  @Default(0.0)
  @Column
  totalPrice?: number;

  @AllowNull(false)
  @NotEmpty
  @Default("processing")
  @Column
  orderStatus!: string;

  @AllowNull(false)
  @NotEmpty
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  deliveredAt!: any;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column
  userid!: number;

  @HasMany(() => Orderitems, "orderid")
  Orderitems!: Orderitems;

  @HasMany(() => Paymentinfo, "orderid")
  paymentinfo!: Paymentinfo;
}
