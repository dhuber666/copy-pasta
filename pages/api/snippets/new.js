import nextConnect from "next-connect";
import middleware from "../../../db";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  console.log("handler called");
  const collection = await req.db.collection("snippets");
  const snippet = {
    title: "test",
    text: "copy me",
  };

  collection.insertOne(snippet);

  res.status(200).json(snippet);
  res.end();
});

export default handler;
