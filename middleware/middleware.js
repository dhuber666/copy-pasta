import nextConnect from "next-connect";
import database from "./database";
import isAuthenticated from "./isAuthenticated";

const middleware = nextConnect();

middleware.use(database).use(isAuthenticated);

export default middleware;
