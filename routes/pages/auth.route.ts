import { Router } from "express";
import * as authPageController from "../../controllers/pages/auth.controller";

const router = Router();

router.get("/login", authPageController.renderLoginPage);
router.get("/register", authPageController.renderRegisterPage);

export default router;
