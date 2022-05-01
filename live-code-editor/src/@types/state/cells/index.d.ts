interface Cell {
  type: CellTypes;
  id: string;
  content: string;
}

type CELL_TYPE = "text" | "code";

interface CodeCellProps {
  cell: Cell;
}

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

interface MoveCellAction {
  type: CellsAction.MOVE_CELL;
  payload: {};
}

type CellsType = "code" | "text";
type CellsDiractionTypes = "up" | "down";

interface CellsAction {
  type: "DELETE_CELL" | "MOVE_CELL" | "INSERT_CELL_AFTER" | "UPDATE_CELL";
  payload: {
    id: string;
    direction?: "up" | "down";
    content?: string;
    type?: CellsType;
    err?: any;
  };
}

interface DeleteCellAction {
  type: CellsAction.DELETE_CELL;
}

interface InsertCellBeforeAction {
  type: CellsAction.INSERT_CELL_BEFORE;
}

interface UpdateCell {
  type: CellsAction.UPDATE_CELL;
}
