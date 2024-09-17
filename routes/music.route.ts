import {Router} from "express"

import * as musicController from "../controllers/music.controller"

const router = Router();

router.get("/songs", musicController.getSongs);
router.get("/songs/:slug", musicController.getSongBySlug);
router.post("/songs/:slug/like", musicController.likeSong);

export default router;
