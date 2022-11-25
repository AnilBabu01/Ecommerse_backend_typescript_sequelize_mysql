import { Router } from "express";
import { createproduct, getproduct } from "../controllers/productControllers";
import { fetch_user, authorizeRoles } from "../middlewares/auth";
export const router = Router();

router.post(
  "/admin/product/create",
  fetch_user,
  authorizeRoles("admin"),
  createproduct
);

router.get("/admin/product/getproducts", getproduct);
