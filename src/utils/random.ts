/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param min - The starting integer value.
 * @param max - The ending integer value.
 * @returns A random integer in the range [min, max].
 * @throws If either min or max is not an integer.
 */
export function random(min: number, max: number): number {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new Error("Both min and max must be integers.");
    }

    // Swap if min is greater than max
    if (min > max) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
