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

export interface paymentinfoI {
  payid?: number | null;
  paymentid: string;
  status: boolean;
  orderid?: number | null;
}

@Table({
  tableName: "Paymentinfos",
  timestamps: true,
})
export class Paymentinfo extends Model implements paymentinfoI {
  @AutoIncrement
  @PrimaryKey
  @Column
  payid?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  paymentid!: string;

  @AllowNull(false)
  @NotEmpty
  @Default(false)
  @Column
  status!: boolean;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => Order)
  @Column
  orderid!: number;
}
