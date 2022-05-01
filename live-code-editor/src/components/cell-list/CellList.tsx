import React from "react";
import { useSelector } from "react-redux";
import AddCell from "../add-cell/AddCell";
import CellListItem from "../cell-list-item/CellListItem";

const CellList: React.FC = () => {
  const { order, data } = useSelector((state: CombinedState) => state.cells);
  const cells = order.map((cellId) => data[cellId]);
  const renderedCells = cells.map((cell) => {
    return (
      <div key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell cellId={cell.id} />
      </div>
    );
  });
  return (
    <div>
      <div className={!renderedCells.length ? "force-visible" : ""}>
        {/* this div is respobsible for showing the add cell with opacity 1.0 in case there are no cells */}
        <AddCell cellId={""} />
      </div>
      {renderedCells}
    </div>
  );
};

export default CellList;
