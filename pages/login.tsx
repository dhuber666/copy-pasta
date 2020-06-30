import Link from "next/link";
import { useState } from "react";
import { useRouter, Router } from "next/router";
import { signin, getSession } from "next-auth/client";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    signin("email", { email });
  };

  return (
    <div className="h-full w-full flex">
      <div
        className="sm:w-2/3 sm:block hidden w-full h-full bg-black z-20 relative"
        style={{
          opacity: 1,
        }}
      >
        <div
          className="hidden w-full h-full sm:flex flex-col items-start py-64 px-20 z-10 relative gradient"

          // style={{
          //   background:
          //     "url('images/top-view-of-desert-2265082.png') center no-repeat",
          //   backgroundSize: "cover",
          // }}
        >
          <img
            src="icons/Logo.svg"
            alt="copy-pasta logo"
            className="inline-block"
          />
          <h1 className="font-sans font-bold text-4xl text-white mt-5">
            CopyPasta
          </h1>
          <p className="font-serif text-white mt-12 text-lg">
            Copypaste.com helps you to easily copy multiple texts at a time it
            makes your workflow easier. Edit this text box , it contains the
            main feature of this site and how it makes the users work easier
          </p>
        </div>
      </div>

      <div className="sm:w-1/3 w-full  h-full bg-mygrey py-56 px-12">
        <h2 className="text-brandRed font-sans font-bold text-3xl hover:underline">
          Login.
        </h2>

        <p className="pt-16 text-brandGrey font-serif text-base">
          Welcome text goes here. Let start by logging in . add some more text
          here. if you don't have a account{" "}
          <Link href="/signup">
            <a className="underline text-brandRed hover:font-bold">Signup</a>
          </Link>{" "}
          here.
        </p>

        <form className="mt-48" onSubmit={handleSubmit}>
          <div className="flex items-center bg-white rounded-lg px-3">
            <img src="images/mail.png" alt="mail icon" />
            <input
              type="email"
              placeholder="email@email.com"
              className="p-3 px-10 rounded-lg block w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white rounded-lg px-3 mt-5">
            <img src="images/key.png" alt="" />
            <input
              type="password"
              placeholder="Password"
              className="p-3 px-10 rounded-lg block w-full outline-none "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link href="/pwreset">
            <a className="mt-10 block text-center font-serif text-brandGrey text-opacity-50 hover:underline">
              Forgot password
            </a>
          </Link>

          <button
            className="mt-10 w-full bg-brandRed text-white py-4 rounded-lg hover:shadow-xl"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// <img src="/icons/Logo.svg" alt="my image" />

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  console.log("hello sessos");
  console.log(typeof window);

  if (typeof window === "undefined") {
    if (session) {
      console.log("i have sesssos");
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
  }

  return {
    props: {
      session,
    },
  };
}

export default Login;
