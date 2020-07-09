import protectedPage from "../../../middleware/protectedPage";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(protectedPage);

handler.get(async (req, res) => {
  res.send("hiho");
});

export default handler;
