import Link from "next/link";
import { signout, useSession } from "next-auth/client";

const Nav = () => {
  const [session, isLoading] = useSession();

  return (
    <nav className="flex justify-between px-8 items-center bg-white h-20 sticky">
      <div className="flex items-center h-full">
        <img src="icons/Logo.svg" alt="copy-pasta logo" className="h-20" />
        <h3 className="ml-8">CopyPaste</h3>
      </div>
      <div className="flex items-center justify-between">
        <Link href="/profile">
          <a className="mr-4">
            <p>{session && session.user.email}</p>
          </a>
        </Link>
        {session && (
          <img
            src={session && session.user.image}
            className="w-12 rounded-full object-cover mr-4"
          />
        )}

        <div className="w-px h-10 bg-gray-600 mr-4" />
        <button onClick={signout}>
          <a>
            <p>Logout</p>
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
