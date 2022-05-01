import React from "react";
import useActions from "../../hooks/useActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./action-bar.scss";

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(cellId, "up")}
      >
        <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(cellId, "down")}
      >
        <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(cellId)}
      >
        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default ActionBar;
