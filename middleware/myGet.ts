import { NextPageContext } from "next";
import Router from "next/router";
import axios from "axios";

export async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers.cookie;

  console.log("hihihihiih");

  try {
    const resp = await axios.get("http://localhost:3000/api/people", {
      withCredentials: true,
      headers: {
        cookie: cookie!,
      },
    });

    return resp;
  } catch (error) {
    if (error.response.status === 401 && !ctx.req) {
      console.log("hello from myget no context");
      Router.replace("/login");
      return {};
    }

    if (error.response.status === 401 && ctx.req) {
      console.log("hi from asdfasdfasdf");
      ctx.res?.writeHead(302, {
        Location: "/login",
      });
      ctx.res?.end();
      return;
    }
  }

  // handle error

  //

  // return resp || { msg: "hiho" };
}
