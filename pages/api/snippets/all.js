import nextConnect from "next-connect";
import middleware from "../../../db";
import protectedRoute from "../../../middleware/protectedPage";

const handler = nextConnect();

handler.use(middleware);
handler.use(protectedRoute);

handler.get(async (req, res) => {
  console.log("servusss", req.userId);

  const collection = await req.db.collection("users");

  const user = await collection.findOne({ email: req.email });

  console.log("here is the user from sipppets/all", user);
  if (!user) {
    res.status(404).json({ msg: "User cannot be found" });
    return;
  }

  if (!user.snippets || (user.snippets && user.snippets.length < 1)) {
    res.status(200).json({ snippets: [] });
    return;
  }

  res.status(200).json({ snippets: user.snippets });
  return;
});

export default handler;
