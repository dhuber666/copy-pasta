import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema({
  title: String,
  text: String,
});

export default mongoose.models.Snippet ||
  mongoose.model("Snippet", SnippetSchema);
