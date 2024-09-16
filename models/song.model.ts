import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    audio: {
        type: String,
        required: true,
    },
    lyrics: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },
    playCount: {
        type: Number,
        default: 0,
    },
    
    
},{
    timestamps: true,   
});

const Song = mongoose.model("Song", songSchema, "songs");

export default Song;
