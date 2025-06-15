import { Request, Response } from "express";
import Song from "../models/song.model";
import Artist from "../models/artist.model";
import Topic from "../models/topic.model";

// @desc    Search for songs, artists, and topics
// @route   GET /api/search?q=<query>
export const search = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i"); // Case-insensitive regex

    const [songs, artists, topics] = await Promise.all([
      Song.find({ title: regex }).select("title artist image slug"),
      Artist.find({ name: regex }).select("name avatar"),
      Topic.find({ title: regex }).select("title image slug"),
    ]);

    res.status(200).json({
      songs,
      artists,
      topics,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
