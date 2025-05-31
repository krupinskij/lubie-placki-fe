import { calculatePages } from './utils';

describe('calculate pages for pagination', () => {
  it('current calmly within range', () => {
    expect(calculatePages(100, 50)).toEqual([
      [1, 2, 3],
      [48, 49, 50, 51, 52],
      [98, 99, 100],
    ]);
  });

  it('current first and last', () => {
    expect(calculatePages(100, 1)).toEqual([
      [1, 2, 3],
      [98, 99, 100],
    ]);
    expect(calculatePages(100, 100)).toEqual([
      [1, 2, 3],
      [98, 99, 100],
    ]);
  });

  it('current near first and last', () => {
    expect(calculatePages(100, 3)).toEqual([
      [1, 2, 3, 4, 5],
      [98, 99, 100],
    ]);
    expect(calculatePages(100, 98)).toEqual([
      [1, 2, 3],
      [96, 97, 98, 99, 100],
    ]);
  });

  it('count is small', () => {
    expect(calculatePages(2, 1)).toEqual([[1, 2]]);
    expect(calculatePages(5, 1)).toEqual([[1, 2, 3, 4, 5]]);
    expect(calculatePages(11, 6)).toEqual([
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    ]);
  });
});
