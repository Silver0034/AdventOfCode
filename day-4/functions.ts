import { getDataAs2DArray, transpose2DArray } from '../day-1/functions'

type CallbackStringFromMatrix = (
	coordinates: [number, number],
	stringLength: number,
	matrix: string[][]
) => string

// Get the coordinates of a character in a matrix
const getCoordinatesOfCharacterInMatrix = (
	matrix: readonly string[][],
	char: string
): [number, number][] => {
	const coordinates: [number, number][] = []

	matrix.forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			if (col === char) {
				coordinates.push([rowIndex, colIndex])
			}
		})
	})

	return coordinates
}

const getCountOfWordInMatrix = (word: string, matrix: string[][]) => {
	const firstLetter = word[0]
	const wordReverse = reverseString(word)
	const wordLength = word.length

	// Get the coordinates of every "X" in the matrix.
	let coordinates = getCoordinatesOfCharacterInMatrix(matrix, firstLetter)

	const matches = coordinates.reduce((count, coordinates) => {
		const [row, col] = coordinates

		const colLeft = col - wordLength + 1
		const rowUp = row - wordLength + 1
		const colRight = col + wordLength - 1

		const paramsForEachDirection = [
			[coordinates, getStringHorizontal], // Right
			[[row, colLeft], getStringHorizontal], // Left
			[[row, col], getStringVertical], // Down
			[[rowUp, col], getStringVertical], // Up
			[[row, col], getStringDownRight], // Down Right
			[[rowUp, colLeft], getStringDownRight], // Up Left
			[[row, col], getStringDownLeft], // Down Left
			[[rowUp, colRight], getStringDownLeft] // Up Right
		] as [[number, number], CallbackStringFromMatrix][]

		paramsForEachDirection.forEach(([coordinates, callback]) => {
			const string = callback(coordinates, wordLength, matrix)

			if (string === word) count++
			if (string === wordReverse) count++
		})

		return count
	}, 0)

	return matches
}

const getStringDownLeft: CallbackStringFromMatrix = (
	coordinates,
	stringLength,
	matrix
): string => {
	const [row, col] = coordinates
	let value = ''
	for (let i = 0; i < stringLength; i++) {
		const newRow = row + i
		const newCol = col - i
		if (matrix[newRow] && matrix[newRow][newCol]) {
			value += matrix[newRow][newCol]
		}
	}
	return value
}

const getStringDownRight: CallbackStringFromMatrix = (
	coordinates,
	stringLength,
	matrix
): string => {
	const [row, col] = coordinates
	let value = ''
	for (let i = 0; i < stringLength; i++) {
		const newRow = row + i
		const newCol = col + i
		if (matrix[newRow] && matrix[newRow][newCol]) {
			value += matrix[newRow][newCol]
		}
	}
	return value
}

const getStringHorizontal: CallbackStringFromMatrix = (
	coordinates,
	stringLength,
	matrix
): string => {
	const [row, col] = coordinates
	const rowString = matrix[row].join('')
	return rowString.slice(col, col + stringLength)
}

const getStringVertical: CallbackStringFromMatrix = (
	coordinates,
	stringLength,
	matrix
): string => {
	const [row, col] = coordinates
	const columnString = matrix.map((row) => row[col]).join('')
	return columnString.slice(row, row + stringLength)
}

/**
 * We are given a word-search full of the word XMAS. We need to find the number
 * of times the word XMAS appears in the word-search. The word XMAS can appear
 * in any direction (horizontal, vertical, diagonal).
 */
const puzzleOne = (inputPath: string): number | void => {
	// Get the data from the file
	const data = getDataAs2DArray(inputPath, /(?<=.)/gs)
	if (!data) return

	const word = 'XMAS'
	return getCountOfWordInMatrix(word, data)
}

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
const puzzleTwo = (inputPath: string): number | void => {
	// Get the data from the file
	const data = getDataAs2DArray(inputPath, /(?<=.)/gs)
	if (!data) return

	const searchWord = 'MAS'
	const middleLetter = 'A'
	const searchWordReverse = reverseString(searchWord)

	// Get the coordinates of every "A" in the matrix.
	let coordinates = getCoordinatesOfCharacterInMatrix(data, middleLetter)

	const rowLength = data.length
	const columnLength = data[0].length

	// It is impossible for the "A" to be in the first or last row or column.
	coordinates = coordinates.filter(([row, col]) => {
		return (
			row !== 0 &&
			col !== 0 &&
			row !== rowLength - 1 &&
			col !== columnLength - 1
		)
	})

	const matches = coordinates.filter(([row, col]) => {
		// Get the letters in the corners around coordinate pair
		const topLeft = data[row - 1][col - 1]
		const topRight = data[row - 1][col + 1]
		const bottomLeft = data[row + 1][col - 1]
		const bottomRight = data[row + 1][col + 1]

		const topLeftToBottomRight = `${topLeft}${middleLetter}${bottomRight}`
		const topRightToBottomLeft = `${topRight}${middleLetter}${bottomLeft}`

		return (
			(topLeftToBottomRight === searchWord ||
				topLeftToBottomRight === searchWordReverse) &&
			(topRightToBottomLeft === searchWord ||
				topRightToBottomLeft === searchWordReverse)
		)
	})

	return matches.length
}

const reverseString = (str: string): string => {
	return str.split('').reverse().join('')
}

export {
	getCoordinatesOfCharacterInMatrix,
	getCountOfWordInMatrix,
	getStringDownLeft,
	getStringDownRight,
	getStringHorizontal,
	getStringVertical,
	puzzleOne,
	puzzleTwo,
	reverseString
}
