import nextConnect from "next-connect";
import middleware from "../../../db";
import protectedRoute from "../../../middleware/protectedPage";
import { ObjectId, ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(middleware);
handler.use(protectedRoute);

handler.delete(async (req, res) => {
  const collection = await req.db.collection("users");

  const snippetId = req.body.snippetId;

  console.log("snippet id is: ", snippetId);
  console.log("user id is: ", req.userId);

  console.log("snippet type is: ", typeof snippetId);

  await collection.updateOne(
    { email: req.email },
    { $pull: { snippets: { id: ObjectId(snippetId) } } }
  );

  res.status(200).json({ message: "Snippet deleted" });
  res.end();
  return;
});

export default handler;
