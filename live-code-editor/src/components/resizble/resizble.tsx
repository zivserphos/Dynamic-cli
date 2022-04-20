import { ResizableBox } from "react-resizable";
import React from "react";
import "./resizable.scss";

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      className=""
      height={300}
      width={Infinity}
      resizeHandles={["s"]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;

// <Resizable handle={<MyHandle />} />;
