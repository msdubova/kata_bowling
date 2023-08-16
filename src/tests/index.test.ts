import { calculateGameScore, Trial, Line } from '../index';

describe('calculateGameScore', () => {
    it('should calculate the score if only numbers - no spares, no strikes', () => {
        const gameResult: Line = [[1, 2], [3, 4], [5, 5], [1, 1], [5, 2]];
        const score = calculateGameScore(gameResult);
        expect(score).toBe(29); 
    });

    
    it('should throw error if sum in some frame is more than 9', () => {
        const gameResult: Line = [[1, 2], [3, 4], [5, 5], [1, 1], [5, 9]];
        const scoreFunction = () => calculateGameScore(gameResult);
        expect(scoreFunction).toThrowError("Max 10 points in each frame");
    });
});
