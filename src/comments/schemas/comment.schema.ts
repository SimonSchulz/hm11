import { Schema, model } from "mongoose";
import { CommentDocument } from "../types/comment";

const CommentSchema = new Schema<CommentDocument>({
  content: { type: String, required: true },
  commentatorInfo: {
    userId: { type: String, required: true },
    userLogin: { type: String, required: true },
  },
  createdAt: { type: String, required: true },
  postId: { type: String, required: true },
});

export const CommentModel = model<CommentDocument>("Comment", CommentSchema);
