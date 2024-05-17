import mongoose, { Schema } from "mongoose";

import NoteType from "../src/app/types/Note";

const noteSchema = new Schema<NoteType>(
  {
    title: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

const NoteModel =
  mongoose.models.Note || mongoose.model<NoteType>("Note", noteSchema);

export default NoteModel;
