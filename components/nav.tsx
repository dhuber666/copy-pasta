import Link from "next/link";
import { signout, useSession } from "next-auth/client";

const Nav = () => {
  const [session, isLoading] = useSession();
  if (session) console.log(session);
  return (
    <nav className="flex justify-between px-8 items-center bg-gray-500">
      <div className="flex items-center h-full">
        <img src="icons/Logo.svg" alt="copy-pasta logo" className="h-20" />
        <h3 className="ml-8">CopyPaste</h3>
      </div>
      <div className="flex items-center justify-between w-1/3">
        <Link href="/profile">
          <a>
            <p>{session && session.user.email}</p>
          </a>
        </Link>
        {session && (
          <img
            src={session.user.image}
            className="w-12 rounded-full object-cover"
          />
        )}
        <div className="w-px h-10 bg-gray-600" />
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
