import express from "express";
import * as commentController from "../controllers/commentControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import { uploadFile } from "../middleware/uploadMiddleware";
const router = express.Router();

router.get("/", authGuard, adminGuard, commentController.getAllComments);
router.post("/", authGuard, commentController.createComment);
router.put("/:id", authGuard, commentController.updateComment);
router.delete("/:id", authGuard, commentController.deleteComment);
router.post(
  "/approve/:id",
  authGuard,
  adminGuard,
  commentController.approveComment
);

export default router;
