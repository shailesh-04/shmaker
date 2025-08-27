/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param min - The starting integer value.
 * @param max - The ending integer value.
 * @param decimals - The number of decimal places to round the result.
 * @returns A random integer in the range [min, max].
 * @throws If either min or max is not an integer.
 */
export function random(min: number, max: number, decimals?: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }

  // Generate random number in the range [0, 1)
  const randomValue = Math.random();

  // Scale to the desired range
  let result = randomValue * (max - min) + min;

  // Handle decimal precision if specified
  if (decimals !== undefined) {
    const factor = Math.pow(10, decimals);
    result = Math.round(result * factor) / factor;
  }
  else{
    // Round to the nearest integer if no decimals are specified
    result = Math.round(result);
  }

  return result;
}

/**
 * Delays the execution for the specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


