import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    desc: {
      type: String,
      required: true,
      min: 6,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Nature", "Mountain", "Ocean", "Wildlife", "Forest"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User Model을 참조
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose?.models?.Blog || mongoose.model("Blog", blogSchema);

export default blogModel;
