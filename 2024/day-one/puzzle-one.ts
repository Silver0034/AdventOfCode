// Global constants
const inputFile = './input.txt'

// Imports / Dependencies
import * as fs from 'fs'

// Types
export type NumberArray = number[]
export type NumberArrayArray = number[][]

// Get the values from a file
const getValueFromFile = (filePath: string): string => {
	let returnValue = ''

	try {
		returnValue = fs.readFileSync(filePath, 'utf8')
	} catch (err) {
		console.error(err)
	}

	return returnValue
}

// Get values from text row separated by spaces
const getValuesFromRow = (row: string): NumberArray => {
	const values = row
		.replace(/\r?\n|\r/g, '') // remove line breaks
		.split(/\s+/g) // split on spaces

	return values.map((value) => Number(value))
}

const addValuesToColumns = (
	rowValues: NumberArrayArray,
	returnValues: NumberArrayArray
) => {
	rowValues.forEach((values) => {
		values.forEach((value, index) => {
			if (!returnValues[index]) returnValues[index] = []
			returnValues[index].push(value)
		})
	})

	return returnValues
}

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

// Get columns of values from file as arrays
export const getValueArraysFromFile = (filePath: string): NumberArrayArray => {
	console.log('Getting values from file:', filePath)
	let returnValues = [] as NumberArrayArray

	let data = getValueFromFile(filePath)
	if (!data) return returnValues

	// Split the data into rows
	const rows = data.split('\n')
	if (!rows) return returnValues

	const rowValues = rows.map((row) => getValuesFromRow(row))

	returnValues = addValuesToColumns(rowValues, returnValues)

	return returnValues
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
