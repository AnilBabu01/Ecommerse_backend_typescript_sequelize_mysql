import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";

export const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  models: [User],
});
