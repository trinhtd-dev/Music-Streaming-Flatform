import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", protect, userController.getMyProfile);

export default router;
