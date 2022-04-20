// import { ResizeHandle } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: any;
  width: number;
  height: number;
  resizeHandles: ResizeHandle[];
}
