import { RequestHandler } from "express";
import { Order } from "../models/order";
import { Orderitems } from "../models/orderitems";
import { Paymentinfo } from "../models/paymentinfo";

// Create a new order   =>  /api/order/new
export const newOrder: RequestHandler = async (req, res) => {
  try {
    if (req.user) {
      const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
      } = req.body;

      console.log(
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
      );

      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {}
};
