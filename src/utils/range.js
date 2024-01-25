/**
 * The `range` function generates an array of numbers from a starting value to an ending
 * value, inclusive.
 * @param {number} start - The `start` parameter is the starting number of the range.
 * @param {number} end - The `end` parameter represents the ending value of the range.
 * @returns The `range` function returns an array of numbers starting from the `start` value and ending
 * at the `end` value.
 */
export const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
}