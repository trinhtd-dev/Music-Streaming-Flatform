import { Router } from "express";

import * as musicController from "../controllers/music.controller";
import commentRouter from "./comment.route";

const router = Router();

// Re-route to comment router
router.use("/songs/:songId/comments", commentRouter);

router.get("/songs", musicController.getSongs);
router.get("/songs/:slug", musicController.getSongBySlug);
router.post("/songs/:slug/like", musicController.likeSong);

export default router;
