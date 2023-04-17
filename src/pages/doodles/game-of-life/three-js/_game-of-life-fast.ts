export const neighborsOf = (index: number, size: number) => {
  const left = index - 1;
  const right = index + 1;

  const above = index - size;
  const below = index + size;
  const leftAbove = (index - 1 - size) % (size * size);
  const leftBelow = (index - 1 + size) % (size * size);
  const rightAbove = (index + 1 - size) % (size * size);
  const rightBelow = (index + 1 + size) % (size * size);

  return [
    leftAbove,
    above,
    rightAbove,
    left,
    right,
    leftBelow,
    below,
    rightBelow,
  ];
};

const Game = (initial: number[][]) => {
  const _rowSize = initial.length;
  const _size = initial.flat().length;
  const even = new Int8Array(initial.flat());
  const odd = new Int8Array(initial.flat().length);

  let _last: typeof even | typeof odd = even;
  let _next: typeof even | typeof odd = odd;

  const tick = () => {
    for (let i = 0; i < _size; i++) {
      if (_last[i]! < 0) {
        _next[i] = 0b00110000;
      } else {
        _next[i] = 0b00010000;
      }
    }

    for (let i = 0; i < _size; i++) {
      if (_last[i]! < 0) {
        for (const j of neighborsOf(i, _rowSize)) {
          _next[j] <<= 1;
        }
      }
    }
    [_last, _next] = [_next, _last];
  };

  return {
    tick,
    state: () => _last,
  };
};

export { Game };
