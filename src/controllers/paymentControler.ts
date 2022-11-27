import { RequestHandler } from "express";

const stripe = require("stripe")(
  "sk_test_51LopskSGAjDSZQyBE82uyqFif3fMQEClZtqfQNa9ShGl5AJx40if6T7PIX1n5GRNx0OFBi8PwSCzzU54ixoOEbYd00ln4Qgd3F"
);

// Process stripe payments   =>   /api/payment/process
export const processPayment: RequestHandler = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      description: "Software development services",
      currency: "inr",

      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
  }
};
