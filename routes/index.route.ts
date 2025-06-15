import { Application } from "express";

import homeRouter from "./home.route";
import songPageRouter from "./pages/song.route";
import authPageRouter from "./pages/auth.route";
import libraryPageRouter from "./pages/library.route";
import musicRouter from "./music.route";
import authRouter from "./auth.route";
import playlistRouter from "./playlist.route";
import searchRouter from "./search.route";
import artistRouter from "./artist.route";
import topicRouter from "./topic.route";
import userRouter from "./user.route";

// Admin routes
import adminSongRouter from "./admin/song.route";

export const routeIndex = (app: Application) => {
  // Client-side routes
  app.use("/", homeRouter);
  app.use("/songs", songPageRouter);
  app.use("/", authPageRouter);
  app.use("/library", libraryPageRouter);

  // API routes
  const apiPrefix = "/api";
  app.use(`${apiPrefix}/music`, musicRouter);
  app.use(`${apiPrefix}/auth`, authRouter);
  app.use(`${apiPrefix}/playlists`, playlistRouter);
  app.use(`${apiPrefix}/search`, searchRouter);
  app.use(`${apiPrefix}/artists`, artistRouter);
  app.use(`${apiPrefix}/topics`, topicRouter);
  app.use(`${apiPrefix}/users`, userRouter);

  // Admin routes
  const adminApiPrefix = "/api/admin";
  app.use(`${adminApiPrefix}/songs`, adminSongRouter);
};
