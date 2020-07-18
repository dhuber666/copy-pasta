import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Router from "next/router";
import Login from "./login";
import Nav from "../components/nav";
import SnippetsPanel from "../components/snippetsPanel";
import SnippetsDetail from "../components/snippetsDetail";
import useSWR from "swr";
import axios from "axios";

const snippetsUrl = `/api/snippets/all`;

const fetcher = (url) => axios(url).then((r) => r.data);

export default function IndexPage(props) {
  console.log("The props are: ", props);

  console.log(snippetsUrl);

  const initialData = props.data;

  const { data } = useSWR(snippetsUrl, fetcher, { initialData });

  // const initialData = props.data;
  // const fetcher = (url) =>
  //   fetch(url, {
  //     method: "GET",
  //     credentials: "same-origin",
  //   }).then((r) => r.json());

  // const { data, error } = useSWR(snippetsUrl, fetcher, { initialData });

  console.log("data is: ", data);

  useEffect(() => {
    if (props.session) return;

    Router.replace("/", "/login", { shallow: true });
  }, [props.session]);

  if (props.session) {
    return (
      <div className="h-full w-full">
        <Nav />
        <div className="flex w-full bg-bggrey p-4 custom-height">
          <SnippetsPanel snippets={data && data.snippets} />
          <SnippetsDetail />
        </div>
      </div>
    );
  }

  return <Login />;
}

export async function getServerSideProps(ctx) {
  const fetcherServer = (url) =>
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Cookie: ctx.req.headers.cookie,
      },
    }).then((r) => r.json());

  const session = await getSession(ctx);
  const data = await fetcherServer(`${process.env.SITE}${snippetsUrl}`);

  return {
    props: {
      session,
      data,
    },
  };
}
