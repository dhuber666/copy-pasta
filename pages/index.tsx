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
  const json = await myGet(`${process.env.SERVER_URI}/api/people`, ctx);
  return {
    props: {
      people: json,
    }, // will be passed to the page component as props
  };
}
