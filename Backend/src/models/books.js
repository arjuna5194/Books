import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is Required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
    },
    author: {
      type: String,
    },
    category: {
      type: String,
    },
    img: {
      type: String,
    },
    bookPath: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Books", bookSchema);
export default Books;
