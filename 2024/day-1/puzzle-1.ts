// Global constants
const inputFile = './input.txt'

// Imports / Dependencies
import { getValueArraysFromFile } from './utilities'
import type { NumberArray } from './utilities'

const sortArrayByValue = (
	array: NumberArray,
	direction = 'asc'
): NumberArray => {
	if (direction === 'asc') {
		return array.sort((a, b) => a - b)
	} else {
		return array.sort((a, b) => b - a)
	}
}

const run = () => {
	console.log('Day 1: Puzzle 1.')
	// Get input from text file.
	const values = getValueArraysFromFile(inputFile)

	console.log('Computing answer...')

	// Sort both by length, shortest first
	const [columnOne, columnTwo] = values.map((column) =>
		sortArrayByValue(column)
	)

	// Make a new array to hold the differences between each value pair
	const differences = [] as NumberArray

	const length =
		columnOne.length > columnTwo.length
			? columnOne.length
			: columnTwo.length

	for (let i = 0; i < length; i++) {
		const valueOne = columnOne[i] || 0
		const valueTwo = columnTwo[i] || 0

		const difference = Math.abs(valueOne - valueTwo)
		differences.push(difference)
	}

	// add up and return the sum of the differences
	const sum = differences.reduce((a, b) => a + b, 0)

	console.log('Sum of differences:', sum)
}

run()
