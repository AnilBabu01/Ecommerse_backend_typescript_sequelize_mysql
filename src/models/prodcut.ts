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
  email: string;
  password: string;
  otp?: number | null;
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
}
