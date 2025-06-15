import { Router } from "express";
import * as artistController from "../controllers/artist.controller";

const router = Router();

router.get("/:slug", artistController.getArtistBySlug);

export default router;
