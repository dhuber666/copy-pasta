import { connectToDatabase } from "../../../db";

export default async (req, res) => {
  const db = await connectToDatabase();
  const collection = await db.collection("snippets");

  const snippet = {
    title: "test",
    text: "copy me",
  };

  collection.insertOne(snippet);

  res.status(200).json(snippet);
};
