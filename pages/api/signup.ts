import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  if (req.method === "POST") {
    hash(req.body.password, 10, async function (err, hash) {
      // Store hash in your password DB.

      try {
        const person = await req.db.collection("users").insert({
          email: req.body.email,
          password: hash,
        });
        res.json(person);
      } catch (error) {
        console.log("we have error: ", error);
        res.json(error);
      }
    });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
});

export default handler;
