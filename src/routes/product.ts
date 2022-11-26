import { Router } from "express";
import { createproduct, getproduct } from "../controllers/productControllers";
import { fetch_user, authorizeRoles } from "../middlewares/auth";
import { upload } from "../middlewares/upload";
export const router = Router();

router.post(
  "/admin/product/create",
  upload.array("avatar"),
  fetch_user,
  authorizeRoles("admin"),
  createproduct
);

router.get("/admin/product/getproducts", getproduct);
