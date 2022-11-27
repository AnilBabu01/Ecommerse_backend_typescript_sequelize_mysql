import { Router } from "express";
import {
  createproduct,
  getproduct,
  deleteproduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/productControllers";
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

router.delete(
  "/admin/product/delete/:id",
  fetch_user,
  authorizeRoles("admin"),
  deleteproduct
);
router.get("/admin/product/getproducts", getproduct);
router.route("/product/getSingleProduct/:id").get(getSingleProduct);
router
  .route("/admin/product/updateProduct/:id")
  .put(
    fetch_user,
    authorizeRoles("admin"),
    upload.array("avatar"),
    updateProduct
  )
  .delete(fetch_user, authorizeRoles("admin"), deleteproduct);
router;
