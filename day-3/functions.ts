import { readFile } from '../day-1/functions'

// The input string includes bits with mul({number},{number}).
// Return those numbers as a 2D array.
const getMulParamsFromString = (input: string): [number, number][] => {
	const mulParams = input.match(/mul\((\d+),(\d+)\)/g)
	if (!mulParams) return []
	return mulParams.map((param) => {
		const [a, b] = param.match(/\d+/g) || []
		return [parseInt(a), parseInt(b)]
	})
}

const getSumOfMultiplierValues = (input: string): number => {
	const array = getMulParamsFromString(input)
	return array.reduce((accumulator, [a, b]) => accumulator + a * b, 0)
}

const puzzleOne = (inputPath: string): number | void => {
	const input = readFile(inputPath)
	if (!input) return

	return getSumOfMultiplierValues(input)
}

const puzzleTwo = (inputPath: string): number | void => {
	const input = readFile(inputPath)
	if (!input) return

	// there are do() and don't() notes in the input.
	// Remove any content between don't() and do(), or don't() and the end of the string.
	const cleanedInput = input.replace(/don't\(\).*?(do\(\)|$)/gs, '')

	return getSumOfMultiplierValues(cleanedInput)
}

export {
	getMulParamsFromString,
	getSumOfMultiplierValues,
	puzzleOne,
	puzzleTwo
}
