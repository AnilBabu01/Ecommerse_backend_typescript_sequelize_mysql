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
  BelongsTo,
} from "sequelize-typescript";

import { Product } from "./prodcut";
export interface ReviewI {
  reviewid?: number | null;
  userid: number | null;
  name: string;
  comment: string;
  rating?: number | null;
  productid?: number | null;
}

@Table({
  tableName: "reviews",
  timestamps: true,
})
export class Review extends Model implements ReviewI {
  @AutoIncrement
  @PrimaryKey
  @Column
  reviewid?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  userid!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  comment!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  rating?: number;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => Product)
  @Column
  productid!: number;
}
