import React, { useEffect, useRef } from "react";
import previewHtml from "../../utils/previewHtml";
import "./preview.scss";

const Preview: React.FC<any> = ({ code, err, bundle }) => {
  const iframe = useRef<any>(previewHtml(code));

  // useEffect(() => {
  //   iframe.current.srcdoc = previewHtml;
  // }, []);

  useEffect(() => {
    console.log(code);
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "white" }}
        ref={iframe}
        title="user sandbox"
        sandbox="allow-scripts"
        srcDoc={previewHtml(code)}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
