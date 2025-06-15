import { Application } from "express";

import homeRouter from "./home.route";
import musicRouter from "./music.route";
import authRouter from "./auth.route";
import playlistRouter from "./playlist.route";

export const routeIndex = (app: Application) => {
  // Client-side routes
  app.use("/", homeRouter);

  // API routes
  const apiPrefix = "/api";
  app.use(`${apiPrefix}/music`, musicRouter);
  app.use(`${apiPrefix}/auth`, authRouter);
  app.use(`${apiPrefix}/playlists`, playlistRouter);
};
