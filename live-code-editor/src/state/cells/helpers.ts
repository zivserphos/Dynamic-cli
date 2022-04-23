export {};

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

// const deleteCell =
