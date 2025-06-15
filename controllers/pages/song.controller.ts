import { Request, Response } from "express";
import Song from "../../models/song.model";

// [GET] /songs/:slug
export const getDetail = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOne({ slug: req.params.slug });

    if (!song) {
      // Optional: redirect to a 404 page
      return res.redirect("/");
    }

    res.render("pages/music/detail", {
      title: song.title,
      song: song,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};
