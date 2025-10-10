import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // 👈 now we use username instead of userId
      index: true,
    },
    title: {
      type: String,
      required: [true, "Memory title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Memory content is required"],
    },
    category: {
      type: String,
      enum: ["text", "image", "video", "audio", "other"],
      default: "text",
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    source: {
      type: String, // e.g. "upload", "search", "note"
      default: "manual",
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

memorySchema.index({
  username: 1,
  title: "text",
  content: "text",
  tags: "text",
});

const Memory = mongoose.model("Memory", memorySchema);
export default Memory;
