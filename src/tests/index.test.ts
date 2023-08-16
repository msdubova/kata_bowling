import { calculateGameScore } from '../index';

describe('calculateGameScore', () => {
  it('should calculate the score', () => {
    const gameResult: (number | string)[] = [1, 4, 4];
    const score = calculateGameScore(gameResult);
    expect(score).toBe(9);
  });
})