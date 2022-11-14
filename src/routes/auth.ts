import { Router } from "express";
import {
  registerUser,
  loginUser,
  getallusers,
  forgetpassword,
  resetpassword,
} from "../controllers/authController";
import { isAuthenticatedUser } from "../middleware/auth";
export const router = Router();

router.post("/regster", registerUser);
router.post("/login", loginUser);
router.post("/forgetpassword", forgetpassword);
router.get("/resetpassword", resetpassword);
router.get("/getAlluers", getallusers);
