import { Router } from "express";
import { login, signup } from "../Controllers/AuthController.js";
import {
  loginValidation,
  signupValidation,
} from "../Middlewares/Validation.js";

const router = Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
