import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { Productimage } from "./productimages";
import { Review } from "./review";
export interface ProductI {
  productid?: number | null;
  name: string;
  price: number;
  description: string;
  ratings: number;
  category: string;
  seller: string;
  stock: number;
  numOfReviews: number;
}

@Table({
  tableName: "products",
  timestamps: true,
})
export class Product extends Model implements ProductI {
  @AutoIncrement
  @PrimaryKey
  @Column
  productid?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  price!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  description!: string;

  @AllowNull(true)
  @NotEmpty
  @Default(0)
  @Column
  ratings!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  category!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  seller!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  stock!: number;

  @AllowNull(true)
  @NotEmpty
  @Default(0)
  @Column
  numOfReviews!: number;

  @HasOne(() => Productimage, "productid")
  images!: Productimage;

  @HasOne(() => Review, "productid")
  reviews!: Review;
}
