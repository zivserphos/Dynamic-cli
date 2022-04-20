import React, { useEffect, useRef } from "react";
import previewHtml from "../../utils/previewHtml";

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = previewHtml;
  }, []);

  useEffect(() => {
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return (
    <iframe
      style={{ backgroundColor: "white" }}
      ref={iframe}
      title="user sandbox"
      sandbox="allow-scripts"
      srcDoc={previewHtml}
    />
  );
};

export default Preview;
