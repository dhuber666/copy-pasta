import { getSession } from "next-auth/client";
import { useEffect } from "react";
import Router from "next/router";
import Login from "./login";
import Nav from "../components/nav";
import SnippetsPanel from "../components/snippetsPanel";
import SnippetsDetail from "../components/snippetsDetail";
import useSWR from "swr";

const snippetsUrl = `${process.env.SITE}/api/snippets/all`;

export default function IndexPage(props) {
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
    }).then((r) => r.json());

  const { data, error } = useSWR(snippetsUrl, fetcher);

  console.log("data is: ", data);

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
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
    }).then((r) => r.json());

  const session = await getSession(ctx);
  // const data = fetcher(snippetsUrl);

  return {
    props: {
      session,
    },
  };
}
