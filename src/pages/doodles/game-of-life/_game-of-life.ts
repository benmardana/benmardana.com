import { Cell, CellState } from './_cell';
import { cellGrid, CellGrid, Grid } from './_grid';

function Game(initialState: CellGrid | string) {
  const parseStateString = (text: string) => {
    try {
      return JSON.parse(text).map((row: string[]) =>
        row.map((cell) =>
          cell === '*' ? Cell(CellState.ALIVE) : Cell(CellState.DEAD)
        )
      );
    } catch {
      throw Error(`Unable to parse string input: ${text}`);
    }
  };

  const grid = Grid(
    typeof initialState === 'string'
      ? parseStateString(initialState)
      : initialState
  );

  const tick = () =>
    Game(
      Grid(
        grid.flatMap((cell, liveNeighbours) => {
          if (!cell) {
            console.error('error');
            return Cell(CellState.DEAD);
          }
          if (cell.state === CellState.ALIVE) {
            if (liveNeighbours === 2 || liveNeighbours === 3) return cell;
            return cell.kill();
          }
          if (liveNeighbours === 3) return cell.animate();
          return cell;
        })
      ).cells
    );

  const toString = () =>
    JSON.stringify(
      grid.map((row) =>
        row.map((cell) => (cell.state === CellState.ALIVE ? '*' : '.'))
      )
    );

  return {
    tick,
    toString,
    map: grid.map.bind(grid),
  };
}

export { Game, Grid, cellGrid, Cell, CellState };
