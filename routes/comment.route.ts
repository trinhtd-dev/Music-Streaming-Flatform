import { Router } from "express";
import * as commentController from "../controllers/comment.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router({ mergeParams: true }); // mergeParams allows us to access params from parent router (e.g., :songId)

// GET /api/music/songs/:songId/comments
router.get("/", commentController.getCommentsForSong);

// POST /api/music/songs/:songId/comments
router.post("/", protect, commentController.addCommentToSong);

export default router;
