enum CellState {
  ALIVE = 'alive',
  DEAD = 'dead',
}

interface LivingCell {
  state: CellState.ALIVE;
  kill: () => DeadCell;
  survive: () => LivingCell;
}

interface DeadCell {
  state: CellState.DEAD;
  animate: () => LivingCell;
}

type Cell = LivingCell | DeadCell;
function Cell(state: CellState.ALIVE): LivingCell;
function Cell(state: CellState.DEAD): DeadCell;
function Cell(state: CellState) {
  if (state === CellState.ALIVE) {
    return {
      state,
      kill: () => Cell(CellState.DEAD),
      survive: () => Cell(state),
    };
  }
  return {
    state,
    animate: () => Cell(CellState.ALIVE),
  };
}

export { Cell, CellState };
