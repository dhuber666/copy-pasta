import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.cookies.auth) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", null, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 0,
          path: "/",
        })
      );

      res.status(200).json({ message: "user logged out" });
      return;
    }
    res.status(400).json({ message: "already logged out" });
  }
}
