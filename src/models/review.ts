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

export interface ReviewI {
  reviewid?: number | null;
  name: string;
  email: string;
  password: string;
  otp?: number | null;
  role?: String;
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
