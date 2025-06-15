import { Request, Response } from "express";
import Artist from "../models/artist.model";

// @desc    Get artist by slug
// @route   GET /api/artists/:slug
export const getArtistBySlug = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findOne({ slug: req.params.slug }).populate(
      "songs"
    );

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
