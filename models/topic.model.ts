import mongoose from "mongoose";

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
    
},
{
    timestamps: true,
}
);

const Topic = mongoose.model("Topic", topicSchema, "topics");

export default Topic;