import React, { useEffect, useRef } from "react";
import previewHtml from "../../utils/previewHtml";
import "./preview.scss";

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = previewHtml;
  }, []);

  useEffect(() => {
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "white" }}
        ref={iframe}
        title="user sandbox"
        sandbox="allow-scripts"
        srcDoc={previewHtml}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
