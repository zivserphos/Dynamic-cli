import React from "react";
import { useSelector } from "react-redux";
import CellListItem from "../cell-list-item/CellListItem";

const CellList: React.FC = () => {
  const { order, data } = useSelector((state: CombinedState) => state.cells);
  const cells = order.map((cellId) => data[cellId]);
  const renderedCells = cells.map((cell) => {
    return <CellListItem cell={cell} key={cell.id} />;
  });
  return <div> {renderedCells}</div>;
};

export default CellList;
