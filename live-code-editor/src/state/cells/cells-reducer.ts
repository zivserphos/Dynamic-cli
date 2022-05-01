import produce from "immer";
import * as ActionTypes from "./actions-types";
import { nanoid } from "nanoid";
import cellService from "./helpers";

const initialTextCell = cellService.generateCell("text");
const initialCodeCell = cellService.generateCell("code");

const initialState: CellState = {
  loading: false,
  error: null,
  order: [initialTextCell.id, initialCodeCell.id],
  data: {
    [initialTextCell.id]: initialTextCell,
    [initialCodeCell.id]: initialCodeCell,
  },
};

const reducer = produce(
  (state: CellState = initialState, action: CellsAction) => {
    const id = action.payload ? action.payload.id : "";
    switch (action.type) {
      case ActionTypes.DELETE_CELL:
        delete state.data[id];
        const cellIndex = state.order.findIndex((cellId) => cellId === id);
        state.order.splice(cellIndex, 1);
        return state;
      // find the index of the cell to be moved first than swap it according to the direction
      case ActionTypes.MOVE_CELL:
        const cellToBeMovedIndex = state.order.findIndex(
          (cellId) => cellId === id
        );
        const { direction } = action.payload;
        const upOrDown = direction === "up" ? -1 : 1; // sets the target index according to the diraction
        if (
          // Check if the direction is valid due to the cell index
          cellToBeMovedIndex + upOrDown < 0 ||
          cellToBeMovedIndex + upOrDown >= state.order.length
        )
          return state;
        state.order[cellToBeMovedIndex] =
          state.order[cellToBeMovedIndex + upOrDown];
        state.order[cellToBeMovedIndex + upOrDown] = id;
        return state;
      case ActionTypes.UPDATE_CELL:
        const { content } = action.payload;
        state.data[id].content = content || "";
        return state;
      case ActionTypes.INSERT_CELL_BEFORE:
        const newCell: Cell = {
          type: action.payload.type,
          content: "",
          id: nanoid(),
        };
        state.data[newCell.id] = newCell;
        if (!id) {
          // In case user didnt left id to the new cell to be inserted before cell will insert at the last of array
          state.order.push(newCell.id);
          return state;
        }
        const indexToBeInserted = state.order.findIndex(
          (cellId) => cellId === id
        );
        state.order.splice(indexToBeInserted, 0, newCell.id); //   // Insert the cell exactly before the index provided by user
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
