import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: true,
    },
    songs: [
        {
            type: String,
            required: true,
        },
    ],
},{
    timestamps: true,
});

const Artist = mongoose.model("Artist", artistSchema, "artists");

export default Artist;