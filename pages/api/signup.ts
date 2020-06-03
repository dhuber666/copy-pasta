import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();

  if (req.method === "POST") {
    hash(req.body.password, 10, async function (err, hash) {
      // Store hash in your password DB.

      const statement = await db.prepare(
        "INSERT INTO person (name, email, password) values (?, ?, ?)"
      );
      statement.run(req.body.name, req.body.email, hash);

      const person = await db.all("select * from person");
      res.json(person);
    });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
