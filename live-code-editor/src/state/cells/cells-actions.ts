import * as actionTypes from "./actions-types";

export const updateCell = (id: string, content: string): CellsAction => ({
  type: actionTypes.UPDATE_CELL,
  payload: {
    id,
    content,
  },
});

export const moveCell = (
  id: string,
  direction: CellsDiractionTypes
): CellsAction => ({
  type: actionTypes.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

export const insertCellBefore = (
  id: string,
  cellType: CellsType
): CellsAction => ({
  type: actionTypes.INSERT_CELL_BEFORE,
  payload: {
    id,
    type: cellType,
  },
});

export const deleteCell = (id: string | null): CellsAction => ({
  type: actionTypes.DELETE_CELL,
  payload: {
    id: id || "",
  },
});
