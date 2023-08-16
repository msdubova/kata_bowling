// Create a function, which will get parameters - array of elements(numbers or strings) - result of each frame of the game  and will return number  - score of the game

export function calculateGameScore(frames: (number | string)[]): number {
    return frames.reduce((acc: number, currentValue: number | string) => {
        if (typeof currentValue === 'number') {
            return acc + currentValue;
        }
        return acc;
    }, 0);
}

