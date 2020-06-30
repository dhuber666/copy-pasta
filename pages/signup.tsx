import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if ((await resp.status) === 200) {
      return router.push("/");
    }
    const json = await resp.json();
    console.log(await resp);
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
          Signup.
        </h2>

        <p className="pt-16 text-brandGrey font-serif text-base">
          Welcome text goes here. Let start by logging in . add some more text
          here. if you already have a account,{" "}
          <Link href="/login">
            <a className="underline text-brandRed hover:font-bold">Login</a>
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

          <div className="flex items-center bg-white rounded-lg px-3 mt-5">
            <img src="images/key.png" alt="" />
            <input
              type="repeatPassword"
              placeholder="Repeat Password"
              className="p-3 px-10 rounded-lg block w-full outline-none "
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <button
            className="mt-20 w-full bg-brandRed text-white py-4 rounded-lg hover:shadow-xl"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
