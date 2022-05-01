import React from "react";
import ActionBar from "../action-bar/ActionBar";
import CodeCell from "../code-cell/CodeCell";
import TextEditor from "../text-editor/TextEditor";

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div>
      <ActionBar cellId={cell.id} />
      {cell.type === "code" ? (
        <CodeCell cell={cell} />
      ) : (
        <TextEditor cell={cell} />
      )}
    </div>
  );
};

export default CellListItem;
