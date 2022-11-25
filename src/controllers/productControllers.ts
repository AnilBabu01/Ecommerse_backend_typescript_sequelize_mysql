import { RequestHandler } from "express";
import { Product } from "../models/prodcut";

export const createproduct: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};
