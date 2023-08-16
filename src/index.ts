// Create a function, which will get parameters - array of elements(numbers or strings) - result of each frame of the game  and will return number  - score of the game
type Number = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type String = 'X' | '/' | '-';
export type Trial = Number | String;
type Frame = [Trial, Trial]
export type Line = [Frame, Frame, Frame, Frame, Frame] | [Frame, Frame, Frame, Frame, Frame, Frame]

export function calculateGameScore(line: Line): number {
    return line.reduce((acc: number, currentValue: Frame, currentIndex: number) => {
        const [firstTry, secondTry] = currentValue;
        if (typeof firstTry === "number" && typeof secondTry === "number") {
            if (firstTry + secondTry > 10) {
                throw new Error(`Max 10 points in each frame`);
            } else if (firstTry + secondTry === 10) {
                const nextFrameIndex = currentIndex + 1;
                const nextFrame = line[nextFrameIndex];
                const bonus = nextFrame[0];

                if (typeof bonus === 'number') {
                    acc += 10 + bonus;
                } else if (bonus === 'X') {
                    acc += 10 + 10;
                }
            } else {
                acc += firstTry+secondTry;
             
                console.log(`frame score ${firstTry} + ${secondTry}`);
            }
        }

        return acc;
    }, 0);
}
