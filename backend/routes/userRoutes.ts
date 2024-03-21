import express from "express";
import * as userController from "../controllers/userControllers";
import { authGuard } from "../middleware/authMiddleware";
const router = express.Router();


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get("/profile", authGuard, userController.userProfile);


export default router;