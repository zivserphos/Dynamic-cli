import React from "react";
import "./add-cell.scss";
import useActions from "../../hooks/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddCell: React.FC<AddCellProps> = ({ cellId }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className="add-cell">
      <button
        className="button is-rounded is-primary is-small"
        onClick={() => insertCellAfter(cellId, "code")}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span style={{ paddingLeft: "5px" }}>Code</span>
      </button>
      <button
        className="button is-rounded is-primary is-small"
        onClick={() => insertCellAfter(cellId, "text")}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span style={{ paddingLeft: "5px" }}>Text</span>
      </button>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
