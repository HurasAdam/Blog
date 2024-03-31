import express from "express";
import * as tagController from "../controllers/tagControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import { uploadFile } from "../middleware/uploadMiddleware";
const router = express.Router();

router.get("/", authGuard, adminGuard, tagController.getAllTags);
router.post("/", authGuard, adminGuard, tagController.createTag);
// router.put("/:id", authGuard, adminGuard, categoryController.updateCategory);
// router.delete("/:id", authGuard, adminGuard, categoryController.deleteCategory);

export default router;
