import { useState, SyntheticEvent } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  snippet: {
    id: string;
    title: string;
    body: string;
  };
  editSnippet: Function;
  removeSnippet: Function;
}

const SnippetPanelItem = ({ snippet, removeSnippet, editSnippet }: Props) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(snippet.title);

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
      className="mb-2 bg-white rounded-lg h-16 w-full flex items-center justify-between p-6"
      key={snippet.id}
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
        <p>{editedTitle}</p>
      )}

      <div className="flex items-center">
        <FaEdit
          onClick={() => setEditing(true)}
          color="grey"
          className="hover:opacity-75 cursor-pointer mr-6"
          size={22}
        />
        <FaTrash
          onClick={() => removeSnippet(snippet.id)}
          className="text-brandRed hover:opacity-75 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SnippetPanelItem;
