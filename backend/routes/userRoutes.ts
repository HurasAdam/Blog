import express from "express";
import * as userController from "../controllers/userControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import { uploadFile } from "../middleware/uploadMiddleware";
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", authGuard, userController.userProfile);
router.get("/", authGuard, adminGuard, userController.getAllUsers);
router.put("/updateProfile", authGuard, userController.updateProfile);
router.put("/updateProfileAvatar", authGuard, uploadFile.single("profilePicture"), userController.updateProfilePicture);
router.delete("/:id", authGuard, adminGuard, userController.deleteUser);

export default router;
