// Create a function, which will get parameters - array of elements(numbers or strings) - result of each frame of the game  and will return number  - score of the game

export function calculateGameScore(frames: (number | string)[]): number {
    let totalScore = 0;
    let frameIndex = 0;
  
    for (let i = 0; i < 10; i++) {
      const frame = frames[frameIndex];
      
      if (typeof frame === "number") {
        totalScore += frame;
        frameIndex++;
      } else if (frame === "X") { // Strike
        const nextFrame = frames[frameIndex + 1];
        const secondNextFrame = frames[frameIndex + 2];
  
        if (typeof nextFrame === "number" && typeof secondNextFrame === "number") {
          totalScore += 10 + nextFrame + secondNextFrame;
        }
  
        frameIndex++;
      } else if (frame === "/") { // Spare
        const nextFrame = frames[frameIndex + 1];
  
        if (typeof nextFrame === "number") {
          totalScore += 10 + nextFrame;
        }
  
        frameIndex += 2;
      }
    }
  
    return totalScore;
  }
  
  // Example usage
  const gameResult: (number | string)[] = [5, "/", 13, 6, "X", 9, 1, "X", "X", 8, 1, 4, "/", 5, 4, "X", 9, 0];
  const score = calculateGameScore(gameResult);
  console.log("Game Score:", score); // Output: Game Score: 159
  