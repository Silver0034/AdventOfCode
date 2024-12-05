import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Cast all values in a 2D array to ints
const cast2DArrayToInts = (array: unknown[][]): number[][] => {
	return array.map((row) => row.map((value) => parseInt(value as string)))
}

const getDataAs2DArray = (
	inputPath: string,
	separator: string | RegExp = /\s+/g
): string[][] | void => {
	// Get the data
	const data = readFile(inputPath)
	if (!data) return

	return getRows(data, separator)
}

// Get the data from a file and return it as a 2D array of numbers
const getDataAsNumber2DArray = (inputPath: string): number[][] | void => {
	// Get the data
	const rows = getDataAs2DArray(inputPath)
	if (!rows) return

	// cast the rows to numbers
	return cast2DArrayToInts(rows)
}

// Get count of number of instances of a value in an array
const getInstanceCount = (
	value: unknown,
	array: readonly unknown[]
): number => {
	return array.filter((item) => item === value).length
}

// For each row, split the row by the separator and return an array of arrays
const getRows = (
	input: string,
	separator: string | RegExp = /\s+/g
): string[][] => {
	return input.split('\n').map(
		(row) =>
			row
				.replace(/\r?\n|\r/g, '') // remove line breaks
				.split(separator) // split on separator
	)
}

const puzzleOne = (inputPath: string): number | void => {
	const rows = getDataAsNumber2DArray(inputPath)
	if (!rows) return

	// Get the columns
	const columns = transpose2DArray(rows) as number[][]

	// Sort each column by length, shortest first
	const [columnOne, columnTwo] = columns.map((column) =>
		sortNumberArrayByValue(column)
	)

	// Make a new array to hold the differences between each value pair
	const differences = [] as number[]

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

	return sumArray(differences)
}

const puzzleTwo = (inputPath: string): number | void => {
	const rows = getDataAsNumber2DArray(inputPath)
	if (!rows) return

	// Get the columns
	const [columnOne, columnTwo] = transpose2DArray(rows) as number[][]

	const similarityScores = columnOne.map((value) => {
		const count = getInstanceCount(value, columnTwo)
		return value * count
	})

	return sumArray(similarityScores)
}

// Read a file and return its contents as a string
const readFile = (path: string): string => {
	try {
		return fs.readFileSync(path, 'utf8')
	} catch (err) {
		return ''
	}
}

const sortNumberArrayByValue = (
	array: number[],
	direction: 'asc' | 'desc' = 'asc'
): number[] => {
	if (direction === 'asc') {
		return array.sort((a, b) => a - b)
	} else {
		return array.sort((a, b) => b - a)
	}
}

const sumArray = (array: readonly number[]): number => {
	return array.reduce((a, b) => a + b, 0)
}

// Swap the rows and columns of a 2D array
const transpose2DArray = (rows: readonly unknown[][]): unknown[][] => {
	return rows.map((_, colIndex) => rows.map((row) => row[colIndex]))
}

export {
	cast2DArrayToInts,
	getDataAs2DArray,
	getDataAsNumber2DArray,
	getInstanceCount,
	getRows,
	puzzleOne,
	puzzleTwo,
	readFile,
	sortNumberArrayByValue,
	sumArray,
	transpose2DArray
}
