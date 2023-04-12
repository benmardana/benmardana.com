import { describe, expect, test } from 'vitest';
import { Cell, CellState } from './_cell';
import { cellGrid, Grid } from './_grid';
import { Game } from './_game-of-life';

describe('Cell', () => {
  test('Cell(CellState.ALIVE) returns an alive cell ', () => {
    const cell = Cell(CellState.ALIVE);
    expect(cell.state).toBe('alive');
  });

  test('Cell(CellState.ALIVE).kill returns a dead cell ', () => {
    const cell = Cell(CellState.ALIVE);
    expect(cell.kill().state).toBe('dead');
  });

  test('Cell(CellState.ALIVE).survive returns an alive cell ', () => {
    const cell = Cell(CellState.ALIVE);
    expect(cell.survive().state).toBe('alive');
  });

  test('Cell(CellState.DEAD) returns a dead cell ', () => {
    const cell = Cell(CellState.DEAD);
    expect(cell.state).toBe('dead');
  });

  test('Cell(CellState.DEAD).animate returns an alive cell ', () => {
    const cell = Cell(CellState.DEAD);
    expect(cell.animate().state).toBe('alive');
  });
});

describe('Grid', () => {
  test('at(x,y) returns the cell at coordinate', () => {
    const grid = Grid(
      cellGrid(10, 10, (x, y) => {
        if (x === 2 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        return Cell(CellState.DEAD);
      })
    );

    expect(grid.cellAt(2, 5)?.state).toBe(CellState.ALIVE);
  });

  test('at(x,y) returns undefined when x axis is empty', () => {
    const grid = Grid(cellGrid(0, 10, () => Cell(CellState.DEAD)));

    expect(grid.cellAt(12, 5)).toBe(undefined);
  });

  test('at(x,y) returns undefined when y axis is empty', () => {
    const grid = Grid(cellGrid(10, 0, () => Cell(CellState.DEAD)));

    expect(grid.cellAt(12, 5)).toBe(undefined);
  });

  test('at(x,y) returns the cell when indexing around the curve', () => {
    const grid = Grid(
      cellGrid(10, 10, (x, y) => {
        if (x === 2 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        return Cell(CellState.DEAD);
      })
    );

    expect(grid.cellAt(12, 5)?.state).toBe('alive');
  });

  test('liveNeighbours(x,y) returns the number of living neighbours on same row', () => {
    const grid = Grid(
      cellGrid(10, 10, (x, y) => {
        if (x === 2 && y === 4) {
          return Cell(CellState.ALIVE);
        }
        if (x === 2 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        if (x === 2 && y === 6) {
          return Cell(CellState.ALIVE);
        }
        return Cell(CellState.DEAD);
      })
    );

    expect(grid.liveNeighbours(2, 5)).toBe(2);
  });

  test('liveNeighbours(x,y) returns the number of living neighbours on same column', () => {
    const grid = Grid(
      cellGrid(10, 10, (x, y) => {
        if (x === 1 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        if (x === 2 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        if (x === 3 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        return Cell(CellState.DEAD);
      })
    );

    expect(grid.liveNeighbours(2, 5)).toBe(2);
  });

  test('liveNeighbours(x,y) returns the number of living neighbours on x=y diagonal', () => {
    const grid = Grid(
      cellGrid(10, 10, (x, y) => {
        if (x === 1 && y === 6) {
          return Cell(CellState.ALIVE);
        }
        if (x === 2 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        if (x === 3 && y === 4) {
          return Cell(CellState.ALIVE);
        }
        return Cell(CellState.DEAD);
      })
    );

    expect(grid.liveNeighbours(2, 5)).toBe(2);
  });

  test('liveNeighbours(x,y) returns the number of living neighbours on x=-y diagonal', () => {
    const grid = Grid(
      cellGrid(10, 10, (x, y) => {
        if (x === 1 && y === 4) {
          return Cell(CellState.ALIVE);
        }
        if (x === 2 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        if (x === 3 && y === 6) {
          return Cell(CellState.ALIVE);
        }
        return Cell(CellState.DEAD);
      })
    );

    expect(grid.liveNeighbours(2, 5)).toBe(2);
  });

  test('liveNeighbours(x,y) returns the number of living neighbours when surrounded', () => {
    const grid = Grid(
      cellGrid(10, 10, (x, y) => {
        if (x === 1 && y === 4) {
          return Cell(CellState.ALIVE);
        }
        if (x === 1 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        if (x === 1 && y === 6) {
          return Cell(CellState.ALIVE);
        }
        if (x === 2 && y === 4) {
          return Cell(CellState.ALIVE);
        }
        if (x === 2 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        if (x === 2 && y === 6) {
          return Cell(CellState.ALIVE);
        }
        if (x === 3 && y === 4) {
          return Cell(CellState.ALIVE);
        }
        if (x === 3 && y === 5) {
          return Cell(CellState.ALIVE);
        }
        if (x === 3 && y === 6) {
          return Cell(CellState.ALIVE);
        }
        return Cell(CellState.DEAD);
      })
    );

    expect(grid.liveNeighbours(2, 5)).toBe(8);
  });
});

describe('Game', () => {
  test('game mutates correctly and prints to string', () => {
    const game = Game([
      [
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
      ],
      [
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.ALIVE),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
      ],
      [
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.ALIVE),
        Cell(CellState.ALIVE),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
      ],
      [
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
        Cell(CellState.DEAD),
      ],
    ]);
    const pre = [
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '*', '.', '.', '.'],
      ['.', '.', '.', '*', '*', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
    ];

    const post = [
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '*', '*', '.', '.', '.'],
      ['.', '.', '.', '*', '*', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
    ];

    expect(game.toString()).toBe(JSON.stringify(pre));
    expect(game.tick().toString()).toBe(JSON.stringify(post));
  });
});
