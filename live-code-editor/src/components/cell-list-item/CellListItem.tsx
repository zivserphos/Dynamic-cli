import React from "react";
import ActionBar from "../action-bar/ActionBar";
import CodeCell from "../code-cell/CodeCell";
import TextEditor from "../text-editor/TextEditor";
import "./cell-list-item.scss";

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div className="cell-list-item">
      <div className="action-bar-wrapper">
        <ActionBar cellId={cell.id} />
      </div>
      {cell.type === "code" ? (
        <CodeCell cell={cell} />
      ) : (
        <TextEditor cell={cell} />
      )}
    </div>
  );
};

export default CellListItem;
