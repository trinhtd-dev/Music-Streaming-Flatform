import { Router } from "express";
import * as playlistController from "../controllers/playlist.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// All routes below are protected
router.use(protect);

router
  .route("/")
  .get(playlistController.getMyPlaylists)
  .post(playlistController.createPlaylist);

router
  .route("/:id")
  .get(playlistController.getPlaylistById)
  .put(playlistController.updatePlaylist)
  .delete(playlistController.deletePlaylist);

router.post("/:id/songs", playlistController.addSongToPlaylist);
router.delete("/:id/songs/:songId", playlistController.removeSongFromPlaylist);

export default router;
