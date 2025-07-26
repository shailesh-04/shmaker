import {random} from '../src/lib/random';

describe('random()', () => {
    it('should return a number within the specified range (inclusive min, exclusive max)', () => {
        const min = 5;
        const max = 10;

        for (let i = 0; i < 100; i++) {
            const result = random(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        }
    });

    it('should always return an integer', () => {
        for (let i = 0; i < 100; i++) {
            const result = random(1, 100);
            expect(Number.isInteger(result)).toBe(true);
        }
    });

    it('should return the min value when min === max', () => {
        const value = random(7, 7);
        expect(value).toBe(7);
    });

    it('should handle negative numbers correctly', () => {
        for (let i = 0; i < 100; i++) {
            const result = random(-10, -5);
            expect(result).toBeGreaterThanOrEqual(-10);
            expect(result).toBeLessThanOrEqual(-5);
        }
    });

    it('should swap values if min > max (optional enhancement)', () => {
        const result = random(10, 5);
        expect(result).toBeGreaterThanOrEqual(5);
        expect(result).toBeLessThanOrEqual(10);
    });
});
