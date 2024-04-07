import express from "express";
import * as tagController from "../controllers/tagControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", authGuard, adminGuard, tagController.getAllTags);
router.post("/", authGuard, adminGuard, tagController.createTag);
router.get("/:id", authGuard, adminGuard, tagController.getTag);
router.put("/:id", authGuard, adminGuard, tagController.updateTag);
router.delete("/:id", authGuard, adminGuard, tagController.deleteTag);

export default router;
