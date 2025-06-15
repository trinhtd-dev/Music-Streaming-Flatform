import mongoose from "mongoose";
import slugify from "slugify";

const songSchema = new mongoose.Schema(
  {
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
    featured: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

songSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Song = mongoose.model("Song", songSchema, "songs");

export default Song;
