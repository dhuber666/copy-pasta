import { getSession } from "next-auth/client";
import { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import Login from "./login";

export default function IndexPage(props) {
  useEffect(() => {
    if (props.session) return;

    Router.replace("/", "/login", { shallow: true });
  }, [props.session]);

  if (props.session) {
    return (
      <div>
        <h2>Logged In</h2>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    );
  }

  return <Login />;
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
}
