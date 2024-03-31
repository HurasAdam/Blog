import express from "express";
import * as postController from "../controllers/postControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import { uploadFile } from "../middleware/uploadMiddleware";
const router = express.Router();

router.post(
  "/",
  authGuard,
  uploadFile.single("postPicture"),
  postController.createPost
);
router.get("/:id", postController.getPost);
router.get("/", postController.getAllPosts);
router.put(
  "/:id",
  authGuard,
  uploadFile.single("postPicture"),
  postController.updatePost
);
router.delete("/:id", authGuard, adminGuard, postController.deletePost);

export default router;
