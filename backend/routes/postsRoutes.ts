import express from "express";
import * as postController from "../controllers/postControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
import { uploadFile } from "../middleware/uploadMiddleware";
const router = express.Router();


router.post("/", authGuard, uploadFile.single("postPicture"), postController.createPost);
router.put("/:id", authGuard, uploadFile.single("postPicture"), postController.updatePost);
router.get("/:id", authGuard, postController.getPost);


export default router;