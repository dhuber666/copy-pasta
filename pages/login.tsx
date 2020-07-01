import Link from "next/link";
import { useState } from "react";
import { useRouter, Router } from "next/router";
import { signin, getSession } from "next-auth/client";
import { FaGoogle } from "react-icons/fa";
import { sign } from "jsonwebtoken";

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
      <div className="sm:w-2/3 sm:block hidden z-20 relative">
        <div className="w-full h-full flex flex-col items-center px-20 justify-center z-10 relative gradient">
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

      <div
        className="sm:w-1/3 w-full h-full bg-mygrey px-8 flex flex-col 
        justify-center items-center
      "
      >
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

        <form className="mt-12" onSubmit={handleSubmit}>
          <div className="flex items-center bg-white rounded-lg px-3">
            <img src="images/mail.png" alt="mail icon" />
            <input
              type="email"
              placeholder="email@email.com"
              className="p-3 px-10 rounded-lg block w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          {/* <Link href="/pwreset">
            <a className="mt-10 block text-center font-serif text-brandGrey text-opacity-50 hover:underline">
              Forgot password
            </a>
          </Link> */}

          <button
            className="mt-10 w-full bg-brandRed text-white py-4 rounded-lg hover:shadow-xl"
            type="submit"
            disabled
          >
            Currently disabled
          </button>
          <div className="flex w-full items-center justify-center">
            <div className="h-px bg-gray-700 w-1/3" />
            <p className="inline-block mx-2 my-4">Or</p>
            <div className="h-px bg-gray-700 w-1/3" />
          </div>
          <button
            className="text-center rounded-lg border-brandRed border-2 w-full h-12 hover:shadow-xl"
            onClick={() => signin("google")}
            type="button"
          >
            Login with <FaGoogle className="inline-block" />
            oogle
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
