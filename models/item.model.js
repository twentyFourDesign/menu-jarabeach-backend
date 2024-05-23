import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export { Item };
