import { Request, Response } from "express";
import Topic from "../models/topic.model";
import Song from "../models/song.model";

// @desc    Get topic by slug
// @route   GET /api/topics/:slug
export const getTopicBySlug = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.findOne({ slug: req.params.slug });

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const songs = await Song.find({ topic: topic.title }).select(
      "title artist image slug"
    );

    res.status(200).json({
      topic,
      songs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
