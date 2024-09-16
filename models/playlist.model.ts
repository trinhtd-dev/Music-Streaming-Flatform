import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    songs: [{
       type: String
    }],
    creator: {
        type: String,
    }
 
}, {
    timestamps: true
});

const Playlist = mongoose.model("Playlist", playlistSchema, "playlists");

export default Playlist;