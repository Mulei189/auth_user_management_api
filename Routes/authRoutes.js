import { Router } from "express";
import { signUp, login } from "../Controllers/authController.js";

const router = Router();

// Register a new user
router.post("/signup", signUp);

// Login existing user
router.post("/login", login);

export default router;
