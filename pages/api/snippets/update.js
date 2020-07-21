import nextConnect from "next-connect";
import middleware from "../../../db";
import protectedRoute from "../../../middleware/protectedPage";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);
handler.use(protectedRoute);

handler.put(async (req, res) => {
  const collection = await req.db.collection("users");

  const snippet = req.body.snippet;

  console.log("snippet is: ", snippet);

  await collection.updateOne(
    { email: req.email, "snippets.id": ObjectId(snippet.id) },
    { $set: { "snippets.$.title": snippet.title } }
  );

  res.status(200).json({ message: "Snippet updated" });
  res.end();
  return;
});

export default handler;
