import { Request, Response } from "express";
import Song from "../../models/song.model";

// @desc    Create a new song
// @route   POST /api/admin/songs
export const createSong = async (req: Request, res: Response) => {
  try {
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(400).json({ message: "Failed to create song", error });
  }
};

// @desc    Update a song
// @route   PUT /api/admin/songs/:id
export const updateSong = async (req: Request, res: Response) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(400).json({ message: "Failed to update song", error });
  }
};

// @desc    Delete a song
// @route   DELETE /api/admin/songs/:id
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
