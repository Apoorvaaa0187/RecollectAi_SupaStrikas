import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
        user: { type: String, required: true},
        title: { type: String, required:true},
        url: { type: String, required:true},
        summary: { type: String, required:true},
        tags: { type: [String], default: []},
        emotion: { type: [String]},
    },
    { timestamps: true }
);
const Content = mongoose.model('Content', contentSchema);
export default Content;