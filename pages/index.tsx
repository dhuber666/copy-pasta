import { getSession } from "next-auth/client";
import { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import Login from "./login";
import Nav from "../components/nav";
import SnippetsPanel from "../components/snippetsPanel";
import SnippetsDetail from "../components/snippetsDetail";

export default function IndexPage(props) {
  useEffect(() => {
    if (props.session) return;

    Router.replace("/", "/login", { shallow: true });
  }, [props.session]);

  if (props.session) {
    return (
      <div className="h-full w-full">
        <Nav />
        <div className="flex w-full h-full bg-bggrey p-4">
          <SnippetsPanel />
          <SnippetsDetail />
        </div>
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
