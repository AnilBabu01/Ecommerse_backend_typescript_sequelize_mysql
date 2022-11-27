import { Router } from "express";
import { newOrder } from "../controllers/orderControllers";
import { fetch_user, authorizeRoles } from "../middlewares/auth";

export const router = Router();

router.post("/order/neworder", fetch_user, newOrder);
