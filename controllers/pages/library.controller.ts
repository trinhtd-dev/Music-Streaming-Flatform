import { Request, Response } from "express";
import Playlist from "../../models/playlist.model";

// [GET] /library
export const index = async (req: Request, res: Response) => {
  // The user object is attached to res.locals by the user middleware
  const user = res.locals.user;

  if (!user) {
    return res.redirect("/login");
  }

  try {
    const playlists = await Playlist.find({ user: user.id });

    res.render("pages/library/index", {
      title: "Your Library",
      playlists: playlists,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};
