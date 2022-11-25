import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
} from "sequelize-typescript";

export interface ProductI {
  productid?: number | null;
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: string;
  category: string;
  seller: string;
  stock: number;
  numOfReviews: number;
  role?: String;
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

  @AllowNull(false)
  @NotEmpty
  @Default(0)
  @Column
  ratings!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  images!: string;

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

  @AllowNull(false)
  @NotEmpty
  @Column
  numOfReviews!: number;
}
