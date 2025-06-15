import { Router } from "express";
import * as songPageController from "../../controllers/pages/song.controller";

const router = Router();

router.get("/:slug", songPageController.getDetail);

export default router;
