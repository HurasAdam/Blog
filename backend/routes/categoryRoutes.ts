import express from "express";
import * as categoryController from "../controllers/categorycontrollers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import { uploadFile } from "../middleware/uploadMiddleware";
const router = express.Router();

router.get("/", authGuard, adminGuard, categoryController.getAllCategories);
router.post("/", authGuard, adminGuard, categoryController.createCategory);
// router.put("/:id", authGuard, adminGuard, categoryController.updateCategory);
// router.delete("/:id", authGuard, adminGuard, categoryController.deleteCategory);

export default router;
