import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

interface Props extends NextApiRequest {
  isAuthenticated: boolean;
  db: any;
}

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.cookies.auth!, process.env.JSON_SECRET, async function (
    err,
    decoded
  ) {
    if (!err && decoded) {
      return await fn(req, res);
    }

    res.status(401).json({ message: "Sorry you are not authenticated" });
  });
};

handler.get(async (req: Props, res) => {
  if (req.isAuthenticated) {
    let doc = await req.db.collection("users").findOne();
    res.json(doc);
    return;
  }

  res.status(401).json({ message: "Sorry you are not authenticated" });
  return;
});

export default handler;
