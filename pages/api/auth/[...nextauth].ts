import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import Cors from "cors";
import { ObjectID } from "mongodb";
import initMiddleware from "../../../middleware/init-middleware";

import { client } from "../../../db";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors()
);

const options = {
  site: process.env.SITE,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  // callbacks: {
  //   signIn: async (user, account, profile) => {
  //     console.log("the best user,", user);

  //     // Return false to display a default error message
  //     return Promise.resolve(true);
  //   },
  // },
  events: {
    signin: async (message) => {
      console.log("the message", message);
      console.log("is new user?", message.isNewUser);

      if (message.isNewUser) {
        if (!client.isConnected()) await client.connect();

        const db = client.db("copy-pasta");
        const collection = await db.collection("users");

        const defaultSnippet = {
          id: new ObjectID(),
          title: "My first snippet",
          body:
            "This is your very first snippet. Try to click me and then try to paste me (strg + v) in another program. You can also delete me, add new snippets (see the plus on the top) or edit me by clicking on the pencil, or simply double click me. Have fun",
        };

        await collection.updateOne(
          { email: message.user.email },
          { $push: { snippets: defaultSnippet } }
        );
      }
    },
  },
  session: {
    jwt: true,
  },
};

export default async (req, res) => {
  await cors(req, res);
  return NextAuth(req, res, options);
};
