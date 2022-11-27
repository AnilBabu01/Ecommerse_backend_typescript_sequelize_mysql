import { Router } from "express";
import { processPayment } from "../controllers/paymentControler";
import { fetch_user, authorizeRoles } from "../middlewares/auth";

export const router = Router();

router.post("/payment/process", fetch_user, processPayment);
