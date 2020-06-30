import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";

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
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const client = new MongoClient(process.env.DATABASE_URL);

        client.connect((err) => {
          if (err) return Promise.resolve(null);

          const db = client.db("copy-pasta");

          const collection = db.collection("users");

          collection.find({}).toArray((err, docs) => {
            console.log("found records?");
            console.log(docs);

            if (err) Promise.resolve(null);

            Promise.resolve(docs);
          });

          client.close();
        });
      },
    }),
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
