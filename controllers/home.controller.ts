import { Request, Response } from "express";
import Song from "../models/song.model";
import Topic from "../models/topic.model";
import Playlist from "../models/playlist.model";

export const index = async (req: Request, res: Response) => {
    try {
        const featuredSongs = await Song.find({}).sort({ playCount: -1 }).limit(5);
        const newSongs = await Song.find().sort({ createAt: -1 }).limit(5);
        const topSongs = await Song.find().sort({ like: -1 }).limit(6);
        const topics = await Topic.find().sort({ createdAt: -1 }).limit(5);
        const playlists = await Playlist.find().sort({ createdAt: -1 }).limit(5);
        res.render("./pages/home/index", {
            title: "Home",
            featuredSongs: featuredSongs,
            newSongs: newSongs,
            topSongs: topSongs,
            topics: topics,
            playlists: playlists
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};