import { Router } from "express";
import * as adminSongController from "../../controllers/admin/song.controller";
import { protect, admin } from "../../middlewares/auth.middleware";

const router = Router();

// All routes are protected and for admins only
router.use(protect, admin);

router.post("/", adminSongController.createSong);
router.put("/:id", adminSongController.updateSong);
router.delete("/:id", adminSongController.deleteSong);

export default router;
