// teejay
// models/image.model.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    filename: {
      type: String,
      required: [true, "Filename is required."],
      trim: true,
    },
    // Add any other fields related to images as needed
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export { Image };
