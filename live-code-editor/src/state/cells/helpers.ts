/* eslint-disable import/no-anonymous-default-export */
import { nanoid } from "nanoid";
const updateCell = (state: CellState, id: string, content: string) => ({
  ...state,
  data: {
    ...state.data,
    [id]: {
      ...state.data[id],
      content,
    },
  },
});

const generateCell = (cellType: CellsType) => ({
  type: cellType,
  id: nanoid(),
  content: cellType === "code" ? "const a=5;" : "# Header",
});

export default { generateCell, updateCell };
