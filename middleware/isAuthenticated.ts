import { verify } from "jsonwebtoken";

export default async function isAuthenticated(req, res, next) {
  verify(req.cookies.auth!, process.env.JSON_SECRET, async function (
    err,
    decoded
  ) {
    if (!err && decoded) {
      console.log("decoded: ", decoded);
      req.isAuthenticated = true;
      return next();
    }

    req.isAuthenticated = false;
    return next();
  });
}
