import { Request, Response } from "express";

import Song from "../models/song.model";
import Topic from "../models/topic.model";

// @desc    Get all songs
// @route   GET /api/music/songs
export const getSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find().select("-lyrics"); // Exclude lyrics from list view
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get a single song by slug
// @route   GET /api/music/songs/:slug
export const getSongBySlug = async (req: Request, res: Response) => {
  try {
    const song = await Song.findOne({ slug: req.params.slug });
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Increment play count
    song.playCount += 1;
    await song.save();

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Like a song
// @route   POST /api/music/songs/:id/like
export const likeSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    song.like += 1;

    await song.save();
    res
      .status(200)
      .json({ like: song.like, message: "Song liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get new release songs
// @route   GET /api/music/new-releases
export const getNewReleases = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find()
      .sort({ createdAt: -1 })
      .limit(10) // Limit to 10 recent songs
      .select("-lyrics");
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get most liked songs
// @route   GET /api/music/most-liked
export const getMostLiked = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find()
      .sort({ like: -1 })
      .limit(10) // Limit to 10 most liked songs
      .select("-lyrics");
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
