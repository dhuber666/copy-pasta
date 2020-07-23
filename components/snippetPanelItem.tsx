import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Snippet {
  id: string;
  title: string;
  body: string;
}

interface Props {
  snippet: Snippet;
  editSnippet: Function;
  removeSnippet: Function;
  setActiveSnippet: Function;
  activeSnippet: Snippet;
}

const SnippetPanelItem = ({
  snippet,
  removeSnippet,
  editSnippet,
  setActiveSnippet,
  activeSnippet,
}: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(snippet.title);

  const isActiveSnippet = activeSnippet?.id === snippet?.id;

  const checkEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (snippet.title === editedTitle) {
        setEditing(false);
        return;
      }

      setEditing(false);
      const editedSnippet = {
        ...snippet,
        title: editedTitle,
      };
      editSnippet(editedSnippet);
    }
  };

  const onBlur = (e) => {
    setEditing(false);
    if (snippet.title === editedTitle) return;

    const editedSnippet = {
      ...snippet,
      title: editedTitle,
    };

    editSnippet(editedSnippet);
  };

  return (
    <div
      className={`mb-2 hover:shadow-lg bg-white rounded-lg h-16 w-full flex items-center justify-between p-6 cursor-pointer ${
        isActiveSnippet ? "bg-brandRed" : ""
      }`}
      key={snippet.id}
      onClick={() => setActiveSnippet(snippet)}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          autoFocus
          onKeyDown={checkEnter}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <p className={`${isActiveSnippet ? "text-white" : "text-brandGrey"}`}>
          {editedTitle}
        </p>
      )}

      <div className="flex items-center">
        <FaEdit
          onClick={() => setEditing(true)}
          color={isActiveSnippet ? "white" : "grey"}
          className="hover:opacity-75 cursor-pointer mr-6"
          size={22}
        />
        <FaTrash
          onClick={() => removeSnippet(snippet.id)}
          className={`${
            isActiveSnippet ? "text-white" : "text-brandRed"
          } hover:opacity-75 cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default SnippetPanelItem;
