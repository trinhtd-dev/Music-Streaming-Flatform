import mongoose from "mongoose";
import slugify from "slugify";

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
},
{
    timestamps: true,
});

topicSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Topic = mongoose.model("Topic", topicSchema, "topics");

export default Topic;