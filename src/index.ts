// Create a function, which will get parameters - array of elements(numbers or strings) - result of each frame of the game  and will return number  - score of the game
type Number = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
const GAMELENGTH = 10;
const LASTFRAME = 8;
const BONUSFRAME = 9;
// 'X' - strike, '/' - spare, '-' - miss
type String = "X" | "/" | "-";
export type Trial = Number | String;
type Frame = [Trial, Trial?] | ["X"] | ["-"];
export type Line =
  | [Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame, Frame]
  | [
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame
    ]
  | [
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame,
      Frame
    ];

export function calculateGameScore(line: Line): number {
  return line.reduce(
    (acc: number, currentValue: Frame, currentIndex: number) => {
      let [firstTry, secondTry] = currentValue;

      if (line.length > GAMELENGTH && line[LASTFRAME + 1][0] === "X" && line[LASTFRAME + 2][0] !== "X") {
        if (line[BONUSFRAME].length === 1) {
          throw new Error(`Not enough trials in the last bonus frame`);
        }
      }

      if (line.length === GAMELENGTH && line[LASTFRAME][1] === "/") {
        if (line[BONUSFRAME].length === 2) {
          throw new Error(`Just one bonus trial for BONUSFRAME spare, not two`);
        }
      }

      if (firstTry === "-") {
        firstTry = 0;
      }

      if (secondTry === "-") {
        secondTry = 0;
      }
      if (
        firstTry === 0 &&
        secondTry === undefined &&
        line.length !== GAMELENGTH
      ) {
        throw new Error(`standart frame is double trial even if its miss`);
      }
      if (typeof firstTry === "number" && typeof secondTry === "number") {
        if (firstTry + secondTry > 10) {
          throw new Error(`Max 10 points in each frame`);
        } else {
          acc += firstTry + secondTry;
          //   console.log(`frame score ${firstTry} + ${secondTry}`);
        }
      } else if (firstTry === "X" && secondTry === undefined) {
        const nextFrameIndex = currentIndex + 1;
        if (nextFrameIndex < line.length) {
          const nextFrameFirst = line[nextFrameIndex][0];
          const nextFrameSecond = line[nextFrameIndex][1];
          if (typeof nextFrameFirst === "number") {
            if (nextFrameSecond === "/") {
              acc += 10 + nextFrameFirst;
            } else if (nextFrameSecond === "X") {
              acc += 20;
            }
          }
        } else {
          acc += 10;
        }
      } else if (firstTry === 5 && secondTry === "/") {
        const nextFrameIndex = currentIndex + 1;
        if (nextFrameIndex <= line.length - 1) {
          const nextFrame = line[nextFrameIndex];
          if (typeof nextFrame[0] === "number") {
            acc += 10 + nextFrame[0];
          } else if (nextFrame[0] === "X") {
            acc += 20;
          }
        } else {
          acc += 10;
        }
      } else if (typeof firstTry === "number" && secondTry === undefined) {
        acc += firstTry;
      } else if (firstTry === "/" && secondTry === undefined) {
        throw new Error(`No single frame spare`);
      } else if (firstTry === "X" && secondTry === "X") {
        throw new Error(`No two strikes in one frame`);
      } else if (secondTry === "X") {
        throw new Error(`Strike can be just in single frame`);
      } else if (firstTry === "/" && secondTry === "/") {
        throw new Error(`Spare can be once in the frame`);
      }

      return acc;
    },
    0
  );
}
