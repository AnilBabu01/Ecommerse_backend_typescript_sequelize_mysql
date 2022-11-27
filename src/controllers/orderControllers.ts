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

      let order: any;
      let orderitems: any;
      let payinfo: any;
      console.log(req.user.userid);

      //   order = await Order.create({
      //     address: shippingInfo.address,
      //     phone: shippingInfo.phone,
      //     postalCode: shippingInfo.postalCode,
      //     country: shippingInfo.country,
      //     paidAt: Date.now(),
      //     itemsPrice: Number(itemsPrice),
      //     taxPrice: taxPrice,
      //     shippingPrice: shippingInfo,
      //     totalPrice: Number(totalPrice),
      //     deliveredAt: Date.now(),
      //     userid: req.user.userid,
      //   });

      //   if (order) {
      //     if (orderItems) {
      //       for (let i = 0; i < orderItems.length; i++) {
      //         await Orderitems.create({
      //           name: orderItems[i].name,
      //           quantity: orderItems[i].quantity,
      //           image: orderItems[i].name.image,
      //           price: orderItems[i].name.price,
      //           orderid: order.orderid,
      //         });
      //       }
      //     }
      //     if (paymentInfo) {
      //       payinfo = await Paymentinfo.create({
      //         paymentid: paymentInfo.id,
      //         status: paymentInfo.status,
      //         orderid: order.orderid,
      //       });
      //     }

      //     orderitems = await Orderitems.findAll({
      //       where: { orderid: order.orderid },
      //     });
      //   }
      //   console.log(
      //     orderItems,
      //     shippingInfo,

      //     taxPrice,
      //     shippingPrice,
      //     totalPrice,
      //     paymentInfo
      //   );

      //   res.status(200).json({
      //     success: true,
      //     order: order,
      //     orderitems: orderitems,
      //     payinfo: payinfo,
      //   });
    }
  } catch (error) {}
};
