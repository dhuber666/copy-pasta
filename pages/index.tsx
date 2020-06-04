import Nav from "../components/nav";
import { myGet } from "../middleware/myGet";
import { NextPageContext } from "next";

export default function IndexPage({ people }: any) {
  return (
    <div>
      <Nav />
      <div className="hero">
        <h1 className="title">Next.js + Tailwind CSS</h1>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.SERVER_URI
      : process.env.VERCEL_URL;

  console.log("url is: ", url);
  const json = await myGet(`https://${url}/api/people`, ctx);
  return {
    props: {
      people: json,
    }, // will be passed to the page component as props
  };
}
