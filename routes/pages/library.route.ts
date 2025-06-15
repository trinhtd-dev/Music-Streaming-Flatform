import { Router } from "express";
import * as libraryController from "../../controllers/pages/library.controller";

const router = Router();

router.get("/", libraryController.index);

export default router;
