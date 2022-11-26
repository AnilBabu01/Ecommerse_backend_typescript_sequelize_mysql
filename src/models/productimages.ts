import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";

import { Product } from "./prodcut";
export interface productimageI {
  imageid?: number | null;
  url: string;
  productid?: number | null;
}

@Table({
  tableName: "images",
  timestamps: true,
})
export class Productimage extends Model implements productimageI {
  @AutoIncrement
  @PrimaryKey
  @Column
  imageid?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  url!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => Product)
  @Column
  productid!: number;
}
