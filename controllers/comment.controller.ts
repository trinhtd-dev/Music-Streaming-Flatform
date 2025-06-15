import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Comment from "../models/comment.model";
import Song from "../models/song.model";

// @desc    Get all comments for a song
// @route   GET /api/music/songs/:songId/comments
export const getCommentsForSong = async (req: AuthRequest, res: Response) => {
  try {
    const comments = await Comment.find({ song: req.params.songId })
      .sort({ createdAt: -1 })
      .populate("user", "fullName"); // Populate user's name

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a comment to a song
// @route   POST /api/music/songs/:songId/comments
export const addCommentToSong = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { songId } = req.params;
    const { content } = req.body;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    const comment = new Comment({
      content,
      song: songId,
      user: req.user.id,
    });

    await comment.save();

    const populatedComment = await comment.populate("user", "fullName");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
