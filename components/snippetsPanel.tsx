import { FaSearch } from "react-icons/fa";
import SnippetPanelItem from "./snippetPanelItem";

interface Snippet {
  id: string;
  title: string;
  body: string;
}

interface Props {
  snippets: Snippet[];
  removeSnippet: Function;
  editSnippet: Function;
  setActiveSnippet: Function;
  activeSnippet: Snippet;
  searchText: string;
  setSearchText: Function;
}

const SnippetsPanel = ({
  snippets = [],
  removeSnippet,
  editSnippet,
  setActiveSnippet,
  activeSnippet,
  searchText,
  setSearchText,
}: Props) => {
  return (
    <div className="h-full w-1/3 rounded-lg mr-4 overflow-y-scroll">
      <div className="mb-8 text-xl bg-white rounded-lg h-16 w-full flex items-center justify-between p-6 border-brandRed border-2">
        <input
          type="text"
          placeholder="Search here"
          className="outline-none w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FaSearch className="hover:opacity-75 cursor-pointer text-brandRed" />
      </div>
      {activeSnippet ? (
        snippets?.map((snippet) => (
          <SnippetPanelItem
            key={snippet.id}
            editSnippet={editSnippet}
            snippet={snippet}
            removeSnippet={removeSnippet}
            setActiveSnippet={setActiveSnippet}
            activeSnippet={activeSnippet}
          />
        ))
      ) : (
        <h3>No snippets yet - add one</h3>
      )}
    </div>
  );
};

export default SnippetsPanel;
