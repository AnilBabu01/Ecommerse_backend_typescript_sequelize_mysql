import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Review } from "../models/review";
import { Product } from "../models/prodcut";
import { Productimage } from "../models/productimages";
import { Order } from "../models/order";
import { Orderitems } from "../models/orderitems";
import { Paymentinfo } from "../models/paymentinfo";
export const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  models: [User, Review, Product, Productimage, Order, Orderitems, Paymentinfo],
});
