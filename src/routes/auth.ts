import { Router } from "express";
import {
  registerUser,
  loginUser,
  getusers,
  forgetpassword,
  resetpassword,
  getUserProfile,
} from "../controllers/authController";
import { fetch_user, authorizeRoles } from "../middlewares/auth";

export const router = Router();

router.post("/regster", registerUser);
router.post("/login", loginUser);
router.post("/forgetpassword", forgetpassword);
router.get("/resetpassword", resetpassword);
router.get("/getAlluers", fetch_user, authorizeRoles("admin"), getusers);
router.get("/me", fetch_user, getUserProfile);
