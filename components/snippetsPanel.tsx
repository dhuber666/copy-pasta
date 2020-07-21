import { FaSearch } from "react-icons/fa";
import SnippetPanelItem from "./snippetPanelItem";

interface Props {
  snippets?: any;
  removeSnippet: Function;
  editSnippet: Function;
}

const SnippetsPanel = ({
  snippets = [],
  removeSnippet,
  editSnippet,
}: Props) => {
  return (
    <div className="h-full w-1/3 rounded-lg mr-4 overflow-y-scroll">
      <div className="mb-2 bg-white rounded-lg h-16 w-full flex items-center justify-between p-6">
        <input type="text" placeholder="Search here" className="outline-none" />
        <FaSearch color="grey" className="hover:opacity-75 cursor-pointer" />
      </div>
      {snippets?.map((snippet) => (
        <SnippetPanelItem
          editSnippet={editSnippet}
          snippet={snippet}
          removeSnippet={removeSnippet}
        />
      ))}
    </div>
  );
};

export default SnippetsPanel;
