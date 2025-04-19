import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { protectAuth } from "../middleware/protectAuth.js";
import { getProfile, updateProfile } from "../controllers/userController.js";
const router = express.Router();



router.post("/register" , registerUser )
router.post("/login", loginUser)

router.get("/profile" , protectAuth, getProfile)
router.put('/profile',protectAuth, updateProfile)

export default router