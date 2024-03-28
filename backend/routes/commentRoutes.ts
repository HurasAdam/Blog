import express from "express";
import * as commentController from "../controllers/commentControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import { uploadFile } from "../middleware/uploadMiddleware";
const router = express.Router();


router.post("/", authGuard, commentController.createComment);
router.put("/:id", authGuard, commentController.updateComment);
router.delete("/:id", authGuard, commentController.deleteComment);



export default router;