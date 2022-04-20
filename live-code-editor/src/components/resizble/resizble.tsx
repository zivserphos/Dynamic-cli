import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useEffect, useState, useRef } from "react";
import "./resizable.scss";

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [currentInnerHeight, setCurrentInnerHeight] = useState<number>(
    window.innerHeight
  );
  const [currentInnerWidth, setCurrentInnerWidth] = useState<number>(
    window.innerWidth
  );
  const initalInnerWidth = useRef<number>(window.innerWidth);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const windowSizeListener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setCurrentInnerHeight(window.innerHeight);
        setCurrentInnerWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener("resize", windowSizeListener);

    return () => window.removeEventListener("resize", windowSizeListener);
  }, []);
  const resizableProps: ResizableBoxProps =
    direction === "horizontal"
      ? {
          className: "resize-horizontal",
          height: Infinity,
          width: initalInnerWidth.current * 0.75,
          resizeHandles: ["e"],
          minConstraints: [currentInnerWidth * 0.1, Infinity],
          maxConstraints: [currentInnerWidth * 0.75, Infinity],
        }
      : {
          height: 300,
          width: Infinity,
          resizeHandles: ["s"],
          minConstraints: [Infinity, 24],
          maxConstraints: [Infinity, currentInnerHeight * 0.9],
        };
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;

// <Resizable handle={<MyHandle />} />;
