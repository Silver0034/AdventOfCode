import * as path from 'path'
import {
	cast2DArrayToInts,
	getDataAsNumber2DArray,
	getInstanceCount,
	getRows,
	puzzleOne,
	puzzleTwo,
	readFile,
	sortNumberArrayByValue,
	sumArray,
	transpose2DArray
} from './functions'

describe('Testing Day 1 > Functions > cast2DArrayToInts()', () => {
	test('Empty array should result in an empty array', () => {
		expect(cast2DArrayToInts([])).toEqual([])
	})

	test('Should cast a 2D array of strings to a 2D array of numbers.', () => {
		const input = [
			['1', '2', '3'],
			['4', '5', '6'],
			['7', '8', '9']
		]
		const expectedOutput = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]

		expect(cast2DArrayToInts(input)).toEqual(expectedOutput)
	})
})

describe('Testing Day 1 > Functions > getDataAsNumber2DArray()', () => {
	test('Empty string should result in void', () => {
		expect(getDataAsNumber2DArray('')).toBeUndefined()
	})

	test('Should return a 2D array of numbers from a file.', () => {
		const inputPath = path.join(__dirname, '/input-sample.txt')
		const expectedOutput = [
			[3, 4],
			[4, 3],
			[2, 5],
			[1, 3],
			[3, 9],
			[3, 3]
		]

		expect(getDataAsNumber2DArray(inputPath)).toEqual(expectedOutput)
	})
})

describe('Testing Day 1 > Functions > getInstanceCount()', () => {
	test('Should return number of instances of value in array', () => {
		const value = 1
		const array = [1, 1, 1, 2, 3, 4]
		const expectedOutput = 3

		expect(getInstanceCount(value, array)).toEqual(expectedOutput)
	})

	test('Should return 0 if value is not in array', () => {
		const value = 5
		const array = [1, 1, 1, 2, 3, 4]
		const expectedOutput = 0

		expect(getInstanceCount(value, array)).toEqual(expectedOutput)
	})
})

describe('Testing Day 1 > Functions > getRows()', () => {
	test('Empty string should result in empty string in nested array.', () => {
		expect(getRows('')).toEqual([['']])
	})

	test('Should parse a CSV string into a multidimensional array of strings.', () => {
		const input = '1,2,3\n4,5,6\n7,8,9'
		const separator = ','
		const expectedOutput = [
			['1', '2', '3'],
			['4', '5', '6'],
			['7', '8', '9']
		]

		expect(getRows(input, separator)).toEqual(expectedOutput)
	})
})

describe('Testing Day 1 > Functions > puzzleOne()', () => {
	test('Expect void as result from invalid input', () => {
		expect(puzzleOne('')).toBeUndefined()
	})

	test('Expect 11 as result from sample input', () => {
		expect(puzzleOne(path.join(__dirname, '/input-sample.txt'))).toEqual(11)
	})
})

describe('Testing Day 1 > Functions > puzzleTwo()', () => {
	test('Expect void as result from invalid input', () => {
		expect(puzzleTwo('')).toBeUndefined()
	})

	test('Expect 6 as result from sample input', () => {
		expect(puzzleTwo(path.join(__dirname, '/input-sample.txt'))).toEqual(31)
	})
})

describe('Testing Day 1 > Functions > readFile()', () => {
	test('Empty string should result in empty string.', () => {
		expect(readFile('')).toBe('')
	})

	test('Example input should return a string with a length of 40.', () => {
		expect(readFile(path.join(__dirname, '/input-sample.txt')).length).toBe(
			40
		)
	})

	test('Nonexistent input should return an empty string.', () => {
		expect(
			readFile(path.join(__dirname, '/input-does-not-exist.txt'))
		).toBe('')
	})
})

describe('Testing Day 1 > Functions > sortNumberArrayByValue()', () => {
	const input = [3, 1, 2]
	test('Empty array should result in an empty array', () => {
		expect(sortNumberArrayByValue([])).toEqual([])
	})

	test('Direction asc should return in ascending order', () => {
		const expectedOutput = [1, 2, 3]
		expect(sortNumberArrayByValue(input)).toEqual(expectedOutput)
	})

	test('Direction desc should return in ascending order', () => {
		const expectedOutput = [3, 2, 1]
		expect(sortNumberArrayByValue(input, 'desc')).toEqual(expectedOutput)
	})
})

describe('Testing Day 1 > Functions > sumArray()', () => {
	test('Empty array should result in 0', () => {
		expect(sumArray([])).toEqual(0)
	})

	test('Should return the sum of all values in an array.', () => {
		const input = [1, 2, 3, 4, 5]
		const expectedOutput = 15

		expect(sumArray(input)).toEqual(expectedOutput)
	})
})

describe('Testing Day 1 > Functions > transpose2DArray()', () => {
	test('Empty array should result in an empty array', () => {
		expect(transpose2DArray([])).toEqual([])
	})

	test('Should transpose a 2D array.', () => {
		const input = [
			['1', '2', '3'],
			['4', '5', '6'],
			['7', '8', '9']
		]
		const expectedOutput = [
			['1', '4', '7'],
			['2', '5', '8'],
			['3', '6', '9']
		]

		expect(transpose2DArray(input)).toEqual(expectedOutput)
	})
})
