import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Router from "next/router";
import Login from "./login";
import Nav from "../components/nav";
import SnippetsPanel from "../components/snippetsPanel";
import SnippetsDetail from "../components/snippetsDetail";
import useSWR, { trigger, mutate } from "swr";
import axios from "axios";
import Modal from "react-modal";

const snippetsUrl = `/api/snippets/all`;

// For Modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    border: "none",
    boxShadow: "1px 1px 5px grey",
    width: "40%",
  },
};

const fetcher = (url) =>
  axios(url).then((r) => {
    console.log(r);
    return r.data;
  });

Modal.setAppElement("#__next");

export default function IndexPage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const initialData = props.data;

  const { data } = useSWR(snippetsUrl, fetcher, { initialData });

  console.log("data: ", data);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onNewSnippet = async (e) => {
    e.preventDefault();

    const tempSnippet = {
      title,
      body,
    };

    await mutate(
      "/api/snippets/all",
      (data) => ({ ...data, snippets: [...data.snippets, tempSnippet] }),
      false
    );

    axios.post("/api/snippets/new", {
      title,
      body,
    });

    trigger("/api/snippets/all");

    setTitle("");
    setBody("");
    toggleModal();
  };

  useEffect(() => {
    if (props.session) return;

    Router.replace("/", "/login", { shallow: true });
  }, [props.session]);

  if (props.session) {
    return (
      <div className="h-full w-full">
        <Nav toggleModal={toggleModal} />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
          bodyOpenClassName="bg-orange-800"
        >
          <div className="p-4">
            <h2 className="text-brandRed font-bold text-xl">New Snippet</h2>
            <p className="text-xs font-light text-brandGrey">
              Add a new snippet
            </p>

            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              <label className="text-lg text-brandGrey">
                Title of the snippet:
              </label>
              <input
                className="bg-gray-400 rounded-lg mt-2 block p-4 outline-none placeholder-gray-700 text-brandGrey"
                placeholder="'Copy me...'"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label className="text-lg text-brandGrey block mt-8">
                Text you want to copy
              </label>
              <textarea
                className="bg-gray-400 rounded-lg mt-2 block p-4 outline-none placeholder-gray-700 resize w-full h-64 text-brandGrey"
                placeholder="'2 + 2 = 4'"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </form>
            <div className="flex justify-between items-center mt-8 ">
              <button
                className="text-brandRed font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-brandRed font-bold"
                onClick={onNewSnippet}
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
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
