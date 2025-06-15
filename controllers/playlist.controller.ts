import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Playlist from "../models/playlist.model";
import Song from "../models/song.model";

// @desc    Get all playlists for the logged-in user
// @route   GET /api/playlists
export const getMyPlaylists = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const playlists = await Playlist.find({ user: req.user.id });
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new playlist
// @route   POST /api/playlists
export const createPlaylist = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { name, description } = req.body;
    const playlist = new Playlist({
      name,
      description,
      user: req.user.id,
    });
    const newPlaylist = await playlist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get a single playlist by ID
// @route   GET /api/playlists/:id
export const getPlaylistById = async (req: AuthRequest, res: Response) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Playlists can be public, so we don't check for user ownership here
    // If you want private playlists, you would add the check:
    // if (playlist.user.toString() !== req.user.id) { ... }

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a playlist
// @route   PUT /api/playlists/:id
export const updatePlaylist = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { name, description } = req.body;
    playlist.name = name || playlist.name;
    playlist.description = description || playlist.description;

    const updatedPlaylist = await playlist.save();
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a playlist
// @route   DELETE /api/playlists/:id
export const deletePlaylist = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await playlist.deleteOne();

    res.status(200).json({ message: "Playlist removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a song to a playlist
// @route   POST /api/playlists/:id/songs
export const addSongToPlaylist = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Check if song is already in the playlist
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ message: "Song already in playlist" });
    }

    playlist.songs.push(songId);
    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Remove a song from a playlist
// @route   DELETE /api/playlists/:id/songs/:songId
export const removeSongFromPlaylist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const playlist = await Playlist.findById(req.params.id);
    const { songId } = req.params;

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);

    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
