import mongoose from "mongoose";
import { calculateReadingTime } from "../utils/calculateReadingTime.js";

// Define the user schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the blog title."],
      unique: [true, "Title is already in use."],
    },
    description: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: String,
    },
    tags: {
      type: [String],
    },
    body: {
      type: String,
      required: [true, "A blog must a body."],
    },
  },

  { timestamps: true }
);

// A hook that ensures the reading_time is automatically calculated every time a blog is created
blogSchema.pre("save", function (next) {
  if (this.isModified("body")) {
    this.reading_time = calculateReadingTime(this.body);
  }
  next();
});

//

// Create and export the user model
export const Blog = mongoose.model("blog", blogSchema);
