import { compare } from "bcrypt";
import cookie from "cookie";
import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

interface Props extends NextApiRequest {
  db: any;
}

handler.post(async (req: Props, res) => {
  if (req.method === "POST") {
    const person = await req.db
      .collection("users")
      .findOne({ email: req.body.email });

    compare(req.body.password, person.password, function (err, result) {
      if (!err && result) {
        const claims = { sub: person.id, myPersonEmail: person.email };
        const jwt = sign(claims, process.env.JSON_SECRET, { expiresIn: "1h" });

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
          })
        );
        res.json({ message: "Welcome back to the app!" });
      } else {
        res.json({
          message: "Ups, something went wrong!",
          error: "error is + " + err,
          test: "test",
          result,
        });
      }
    });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
});

export default handler;
