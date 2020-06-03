import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";

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

export default authenticated(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();
  const people = await db.all("select id, email, name from person");

  res.json(people);
});
