const filePath = './input-sample.txt'

import { puzzleOne, puzzleTwo } from './functions'

/**
 * The input has two sections: the first are page order rules, and
 * they looks like:
 *
 * 47|53
 * 97|13
 *
 * And the second are lists of page numbers.
 * 75,47,61,53,29
 * 97,61,53,29,13
 *
 * We need to find out which list of page numbers are valid
 * (following the order rules). The first number in an order rule
 * must come before the second number. They do not have to be right
 * next to each other. For each of the valid lists, take the
 * middle page numbers and sum them together and return the sum.
 *
 */
console.log('Day 5: Puzzle 1:', puzzleOne(filePath))

/**
 * Take the same input format as puzzle one, but take all of the invalid lists,
 * sort them to be valid, and then sum the middle numbers of each list.
 */
console.log('Day 5: Puzzle 2:', puzzleTwo(filePath))
