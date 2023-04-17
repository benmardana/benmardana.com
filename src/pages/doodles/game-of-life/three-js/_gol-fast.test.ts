import { describe, expect, test } from 'vitest';
import { Game, neighborsOf } from './_game-of-life-fast';

describe('Neighbours', () => {
  test('game', () => {
    const neighbours = neighborsOf(4, 3);

    expect(neighbours).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
  });
});

describe('Game', () => {
  test.only('game', () => {
    const newGame = Game([
      [0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000],
      [0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000],
      [0b00000000, 0b00000000, 0b10000000, 0b00000000, 0b00000000],
      [0b00000000, 0b10000000, 0b10000000, 0b10000000, 0b00000000],
      [0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000],
    ]);

    console.log(
      chunk(
        [...newGame.state().values()].map((val) => (val < 0 ? 'X' : 'O')),
        5
      )
    );
  });
});

const chunk = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_: any, i: number) =>
    arr.slice(i * size, i * size + size)
  );
