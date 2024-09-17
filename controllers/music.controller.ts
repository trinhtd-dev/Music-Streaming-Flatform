import { Request, Response } from "express";

import Song from "../models/song.model"
import Topic from "../models/topic.model"

export const getSongs = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find();
        res.render("pages/music/songs", {
            title: "Songs",
            songs: songs
        });

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getSongBySlug = async (req: Request, res: Response) => {
    try {
        const song = await Song.findOne({ slug: req.params.slug });
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }
        const topic = await Topic.findOne({ _id: song.topic});

        res.render("pages/music/song", {
            title: song.title,
            song: song,
            topic: topic
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const likeSong = async (req: Request, res: Response) => {
    try {
        const song = await Song.findOne({ slug: req.params.slug });
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }
        const type = req.body.type;
        if (type === "like") {
            song.like += 1;
        } else if (type === "unlike") {
            song.like -= 1;
        } 

        await song.save();
        res.status(200).json({like: song.like });   
    } catch (error) {
        res.status(500).json(error);
    }
}