import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState, useEffect } from "react";

interface Props {
  activeSnippet: {
    title: String;
    body: String;
    id: String;
  };
}

const SnippetsDetail = ({ activeSnippet }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [activeSnippet]);

  return (
    <div className="h-full w-2/3 bg-white rounded-lg p-4 ">
      <h1>{activeSnippet ? activeSnippet.title : ""}</h1>
      <CopyToClipboard
        text={activeSnippet?.body}
        onCopy={() => setCopied(true)}
      >
        <p>{activeSnippet?.body}</p>
      </CopyToClipboard>
      <span className="text-brandRed">{copied ? "Text copied" : ""}</span>
    </div>
  );
};

export default SnippetsDetail;
