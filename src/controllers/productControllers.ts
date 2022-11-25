import { RequestHandler } from "express";
import { Product } from "../models/prodcut";
import { Productimage } from "../models/productimages";
import { Review } from "../models/review";
export const createproduct: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};
