import { Cell, CellState } from './_cell';

type CellGrid = Cell[][];

const Grid = (initialState: CellGrid) => {
  const cells: CellGrid = initialState;

  const cellAt = (x: number, y: number) => {
    if (cells.length === 0) return undefined;
    if (cells[0]?.length == 0) return undefined;

    const xIndex = x % cells.length;
    const yIndex = y % cells[0]!.length;
    const cell = cells[xIndex]?.[yIndex];

    return cell;
  };

  const liveNeighbours = (x: number, y: number) => {
    let livingNeighbours = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        let [xIndex, yIndex] = [x + i, y + j] as const;
        if (i < 0) {
          xIndex += cells.length;
        }
        if (j < 0) {
          yIndex += cells[0]!.length;
        }

        const cell = cellAt(xIndex, yIndex);
        if (cell?.state === CellState.ALIVE) {
          livingNeighbours += 1;
        }
      }
    }
    return livingNeighbours;
  };

  const flatMap = <T>(callback: (cell: Cell, liveNeighbours: number) => T) =>
    cells.map((_, x) =>
      _.map((_, y) => callback(cellAt(x, y)!, liveNeighbours(x, y)))
    );

  return {
    cellAt,
    liveNeighbours,
    flatMap,
    map: cells.map.bind(cells),
    cells: [...cells],
  };
};

const cellGrid = (
  xLength: number,
  yLength: number,
  callback: (x: number, y: number) => Cell
) =>
  Array.from({ length: xLength }, (_, x) =>
    Array.from({ length: yLength }, (_, y) => callback(x, y))
  );

export { Grid, type CellGrid, cellGrid };
