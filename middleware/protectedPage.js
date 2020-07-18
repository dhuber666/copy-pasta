import jwt from "next-auth/jwt";
import nextConnect from "next-connect";

const secret = process.env.SECRET;

async function protectedPage(req, res, next) {
  req.userId = null;
  req.email = null;
  const token = await jwt.getJwt({ req, secret });
  console.log("the token is this one:", token);
  if (token) {
    req.userId = token.user.id;
    req.email = token.user.email;
    next();
    return;
  }
  res.status(401).json({ status: "unauthorized" });
  return;
}

const middleware = nextConnect();

middleware.use(protectedPage);

export default middleware;
