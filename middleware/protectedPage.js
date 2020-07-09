import jwt from "next-auth/jwt";
import nextConnect from "next-connect";

const secret = process.env.SECRET;

async function protectedPage(req, res, next) {
  const token = await jwt.getJwt({ req, secret });
  if (token) return next();
  res.status(500).json({ status: "unauthorized" });
}

const middleware = nextConnect();

middleware.use(protectedPage);

export default middleware;
