import nextConnect from "next-connect";
import middleware from "../../../db";
import protectedRoute from "../../../middleware/protectedPage";
import { ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(middleware);
handler.use(protectedRoute);

handler.post(async (req, res) => {
  const collection = await req.db.collection("users");

  const snippet = {
    id: new ObjectID(),
    text: "test",
    body: "copy me",
  };

  await collection.updateOne(
    { email: req.email },
    { $push: { snippets: snippet } }
  );

  res.status(200).json(snippet);
  res.end();
  return;
});

export default handler;
