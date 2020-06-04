import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import Router from "next/router";

export async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers.cookie;

  const envUrl =
    process.env.NODE_ENV === "development"
      ? process.env.SERVER_URI
      : process.env.VERCEL_URL;

  console.log("url from myget", url);
  console.log("url from envUrl in myget", envUrl);

  const resp = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  if (resp.status === 401 && !ctx.req) {
    console.log("hello from myget no context");
    Router.replace("/login");
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `https://${envUrl}/login`,
    });
    ctx.res?.end();
    return;
  }

  const json = await resp.json();
  return json;
}
