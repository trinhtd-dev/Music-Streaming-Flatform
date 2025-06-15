import mongoose from "mongoose";
import slugify from "slugify";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    biography: {
      type: String,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

artistSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Artist = mongoose.model("Artist", artistSchema, "artists");

export default Artist;
