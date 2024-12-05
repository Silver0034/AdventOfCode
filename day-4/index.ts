const filePath = './input.txt'

import { puzzleOne, puzzleTwo } from './functions'

/**
 * We are given a word-search full of the word XMAS. We need to find the number
 * of times the word XMAS appears in the word-search. The word XMAS can appear
 * in any direction (horizontal, vertical, diagonal).
 */
console.log('Day 4: Puzzle 1:', puzzleOne(filePath))

/**
 * Now instead of searching for the word XMAS in any direction, we are looking
 * for the shape:
 *
 * M.S
 * .A.
 * M.S
 *
 * And the MAS the diagonal MAS can be either way.
 */
console.log('Day 4: Puzzle 2:', puzzleTwo(filePath))
