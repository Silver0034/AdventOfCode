const inputFile = './input.txt'

import { getValueArraysFromFile } from './puzzle-one'
import type { NumberArray } from './puzzle-one'

const returnSimilarityScoreForValue = (
	targetValue: number,
	array: NumberArray
) => {
	const count = array.filter((item) => item === targetValue).length
	return targetValue * count
}

/**
 * Create a similarity score by adding each number in the left list after
 * multiplying it by the number of times it appears in the right list.
 */
const run = () => {
	console.log('Day 1: Puzzle 1.')

	// Get input from text file.
	const [columnOne, columnTwo] = getValueArraysFromFile(inputFile)

	console.log('Computing answer...')

	const similarityScore = columnOne.map((value) =>
		returnSimilarityScoreForValue(value, columnTwo)
	)

	const total = similarityScore.reduce((acc, value) => acc + value, 0)

	console.log('Total:', total)
}

run()
