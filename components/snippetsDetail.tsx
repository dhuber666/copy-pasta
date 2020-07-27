import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState, useEffect } from "react";
import { FaEdit, FaCopy, FaTrash } from "react-icons/fa";

interface Props {
  activeSnippet: {
    title: string;
    body: string;
    id: string;
  };
  removeSnippet: Function;
  editSnippet: Function;
}

const SnippetsDetail = ({
  activeSnippet,
  removeSnippet,
  editSnippet,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const [editedText, setEditedText] = useState(activeSnippet?.body);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = (e) => {
    setCopied(false);
    e.preventDefault();
    setIsEditing(true);
  };

  const onFinishedEditing = (e) => {
    setIsEditing(false);
    const tempSnippet = {
      ...activeSnippet,
      body: editedText,
    };
    editSnippet(tempSnippet);
  };

  useEffect(() => {
    setCopied(false);
    setEditedText(activeSnippet?.body);
  }, [activeSnippet]);

  return (
    <div className="h-full w-2/3 bg-white rounded-lg p-6 relative">
      <div className="flex justify-between">
        <h1 className="text-brandRed text-xl font-bold">
          {activeSnippet ? activeSnippet.title : ""}
        </h1>
        <div className="flex items-center">
          <FaCopy color="grey" className="cursor-pointer hover:opacity-75" />
          <FaEdit
            color="grey"
            className="ml-4 cursor-pointer hover:opacity-75"
            onClick={handleDoubleClick}
          />
          <FaTrash
            onClick={() => removeSnippet(activeSnippet.id)}
            color="grey"
            className="ml-4 cursor-pointer hover:opacity-75"
          />
        </div>
      </div>

      <div className="w-full bg-white border-t-2 border-opacity-50 my-4 border-brandGrey border-dashed" />

      {activeSnippet ? (
        isEditing ? (
          <textarea
            autoFocus
            onBlur={onFinishedEditing}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full h-64 p-2"
          />
        ) : (
          <CopyToClipboard
            text={activeSnippet?.body}
            onCopy={() => setCopied(true)}
          >
            <p className="text-brandGrey" onDoubleClick={handleDoubleClick}>
              {editedText}
            </p>
          </CopyToClipboard>
        )
      ) : (
        <p>No snippets yet add one</p>
      )}
      <span className="text-brandRed">{copied ? "Text copied" : ""}</span>

      <p
        className="text-brandGrey text-opacity-75 text-sm w-64 mx-auto text-center absolute"
        style={{
          bottom: "2rem",
          left: 0,
          right: 0,
        }}
      >
        Click on the snippet to copy, double click to edit
      </p>
    </div>
  );
};

export default SnippetsDetail;
