import { Router } from "express";
import * as topicController from "../controllers/topic.controller";

const router = Router();

router.get("/:slug", topicController.getTopicBySlug);

export default router;
