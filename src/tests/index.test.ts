import { calculateGameScore } from '../index';

describe('calculateGameScore', () => {
  it('should calculate the score for a game with all open frames', () => {
    const gameResult: (number | string)[] = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6];
    const score = calculateGameScore(gameResult);
    expect(score).toBe(133);
  });

  it('should calculate the score for a game with spares and strikes', () => {
    const gameResult: (number | string)[] = [5, 5, 5, 5, 10, 4, 6, 10, 10, 10, 4, 6, 8, 2, 10, 9, 1, 10];
    const score = calculateGameScore(gameResult);
    expect(score).toBe(201);
  });

  it('should calculate the score for a game with all strikes', () => {
    const gameResult: (number | string)[] = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    const score = calculateGameScore(gameResult);
    expect(score).toBe(300);
  });

  it('should calculate the score for a game with a mix of spares, strikes, and open frames', () => {
    const gameResult: (number | string)[] = ['X', 9, '/', 5, '/', 'X', 'X', 'X', 7, 2, 'X', 9, 0, 8, '/', 'X', 9, 1];
    const score = calculateGameScore(gameResult);
    expect(score).toBe(197);
  });
});
