import nextConnect from "next-connect";
import middleware from "../../../db";
import protectedRoute from "../../../middleware/protectedPage";

const handler = nextConnect();

handler.use(middleware);
handler.use(protectedRoute);

handler.post(async (req, res) => {
  const session = req.session;
  console.log("the session is: ", session);
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
