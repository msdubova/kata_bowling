import { calculateGameScore, Trial, Line } from "../index";

describe("calculateGameScore", () => {
  test("should calculate the score if only numbers - no spares, no strikes", () => {
    const gameResult: Line = [
      [1, 2],
      [3, 4],
      [5, 4],
      [1, 1],
      [5, 2],
      [1, 2],
      [3, 4],
      [5, 4],
      [1, 1],
      [5, 2],
    ];
    const score = calculateGameScore(gameResult);
    expect(score).toBe(56);

    const gameResult1: Line = [
      [1, 2],
      [3, 4],
      [5, 1],
      [2, 3],
      [4, 5],
      [1, 2],
      [3, 4],
      [5, 1],
      [2, 3],
      [4, 5],
    ];
    const score1 = calculateGameScore(gameResult1);
    expect(score1).toBe(60);

    const gameResult2: Line = [
      [4, 3],
      [2, 1],
      [3, 2],
      [1, 4],
      [5, 1],
      [4, 3],
      [2, 1],
      [3, 2],
      [1, 4],
      [5, 1],
    ];
    const score2 = calculateGameScore(gameResult2);
    expect(score2).toBe(52);

    const gameResult3: Line = [
      [5, 4],
      [2, 2],
      [3, 3],
      [4, 1],
      [1, 5],
      [5, 4],
      [2, 2],
      [3, 3],
      [4, 1],
      [1, 5],
    ];
    const score3 = calculateGameScore(gameResult3);
    expect(score3).toBe(60);

    const gameResult4: Line = [
      [3, 6],
      [4, 5],
      [2, 4],
      [1, 3],
      [5, 2],
      [3, 6],
      [4, 5],
      [2, 4],
      [1, 3],
      [5, 2],
    ];
    const score4 = calculateGameScore(gameResult4);

    expect(score4).toBe(70);

    const gameResult5: Line = [
      ["-", 6],
      [4, 5],
      ["-", 4],
      [1, 3],
      [5, 2],
      ["-", 6],
      [4, 5],
      ["-", 4],
      [1, 3],
      [5, 2],
    ];
    const score5 = calculateGameScore(gameResult5);

    expect(score5).toBe(60);
  });

  test("should throw error if sum in some frame is more than 10", () => {
    const gameResult: Line = [
      [1, 2],
      [8, 4],
      [5, 4],
      [1, 1],
      [5, 2],
      [1, 2],
      [8, 4],
      [5, 4],
      [1, 1],
      [5, 2],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError("Max 10 points in each frame");
  });

  test("should calculate score with spare", () => {
    const gameResult: Line = [
      [1, 2],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, 2],
      [1, 2],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, 2],
    ];
    const score = calculateGameScore(gameResult);
    expect(score).toBe(60);
  });

  test("should calculate score with spare in the 10th frame", () => {
    const gameResult: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [5, "/"],
      [2],
    ];
    const score = calculateGameScore(gameResult);
    expect(score).toBe(32);
  });

  test("return error - cant be spare if one element in frame - the additional frame", () => {
    const gameResult: Line = [
      [1, 2],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, "/"],
      [1, 2],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, "/"],
      ["/"],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError("No single frame spare");
  });

  test("return error - cant be spare if one element in frame", () => {
    const gameResult: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 2],
      [3, 4],
      ["/"],
      [1, 1],
      [5, "/"],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError("No single frame spare");
  });

  test("return error - double X", () => {
    const gameResult: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      ["X", "X"],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, "/"],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError("No two strikes in one frame");
  });

  test("return error - secondTry X", () => {
    const gameResult: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [4, "X"],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, "/"],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError("Strike can be just in single frame");
  });

  test("return error - double spare", () => {
    const gameResult: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      ["/", "/"],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, "/"],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError("Spare can be once in the frame");
  });

  test("return error - Bonus for last 5 strike - 1 frame from two trials  - not from one ", () => {
    const gameResult: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [2, 2],
      [3, 4],
      [5, "/"],
      [1, 1],
      ["X"],
      [5],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError(
      "Not enough trials in the last bonus frame"
    );
  });

  test("return error - Bonus for last 5 spare - 1 frame from one trial  -not from two ", () => {
    const gameResult: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [2, 2],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, "/"],
      [5, 5],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError(
      "Just one bonus trial for 5 spare, not two"
    );
  });

  test("return error - standart frame is double trial even if its miss ", () => {
    const gameResult: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      ["-"],
      [3, 4],
      [5, "/"],
      [1, 1],
      [5, 4],
    ];
    const scoreFunction = () => calculateGameScore(gameResult);
    expect(scoreFunction).toThrowError(
      "standart frame is double trial even if its miss"
    );
  });

  test("should calculate a perfect game", () => {
    const gameResult1: Line = [
      ["X"],
      ["X"],
      ["X"],
      ["X"],
      ["X"],
      ["X"],
      ["X"],
      ["X"],
      ["X"],
      ["X"],
      ["X"],
      ["X"],
    ];
    const score1 = calculateGameScore(gameResult1);
    expect(score1).toBe(320);
  });

  test("should calculate a game with all 9s and misses", () => {
    const gameResult2: Line = [
      [9, "-"],
      [9, "-"],
      [9, "-"],
      [9, "-"],
      [9, "-"],
      [9, "-"],
      [9, "-"],
      [9, "-"],
      [9, "-"],
      [9, "-"],
    ];
    const score2 = calculateGameScore(gameResult2);
    expect(score2).toBe(90);
  });

  test("should calculate a game with all spares and a final 5", () => {
    const gameResult3: Line = [
      [5, "/"],
      [5, "/"],
      [5, "/"],
      [5, "/"],
      [5, "/"],
      [5, "/"],
      [5, "/"],
      [5, "/"],
      [5, "/"],
      [5, "/"],
      [5],
    ];
    const score3 = calculateGameScore(gameResult3);
    expect(score3).toBe(155);
  });

  test("should calculate a custom game result", () => {
    const gameResult4: Line = [
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      [1, 1],
      ["-", 6],
      [4, 5],
      ["-", 4],
      [1, 3],
      [5, 2],
    ];
    const score4 = calculateGameScore(gameResult4);
    expect(score4).toBe(40);
  });
});
