import { calculateGameScore, Trial, Line } from '../index';

describe('calculateGameScore', () => {
   
    test('should calculate the score if only numbers - no spares, no strikes', () => {
        const gameResult: Line = [[1, 2], [3, 4], [5, 4], [1, 1], [5, 2]];
        const score = calculateGameScore(gameResult);
        expect(score).toBe(28); 
        
        const gameResult1: Line = [[1, 2], [3, 4], [5, 1], [2, 3], [4, 5]];
        const score1 = calculateGameScore(gameResult1);
        expect(score1).toBe(30);

        const gameResult2: Line = [[4, 3], [2, 1], [3, 2], [1, 4], [5, 1]];
        const score2 = calculateGameScore(gameResult2);
        expect(score2).toBe(26);

        const gameResult3: Line = [[5, 4], [2, 2], [3, 3], [4, 1], [1, 5]];
        const score3 = calculateGameScore(gameResult3);
        expect(score3).toBe(30);

        const gameResult4: Line = [[3, 6], [4, 5], [2, 4], [1, 3], [5, 2]];
        const score4 = calculateGameScore(gameResult4);
        expect(score4).toBe(35);
    });

    test('should throw error if sum in some frame is more than 10', () => {
        const gameResult: Line = [[1, 2], [8, 4], [5, 4], [1, 1], [5, 2]];
        const scoreFunction = () => calculateGameScore(gameResult);
        expect(scoreFunction).toThrowError("Max 10 points in each frame");
    });

    test('should calculate score with spare', () => {
        const gameResult: Line = [[1, 2], [3, 4], [5, 5], [1, 1], [5, 2]];
        const score = calculateGameScore(gameResult);
        expect(score).toBe(30);
    });

});
