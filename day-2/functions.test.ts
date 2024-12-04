import * as path from 'path'
import {
	getIndexOfUnsafeValue,
	isArrayIncreasing,
	isSafeAfterRemovingValue,
	puzzleOne,
	puzzleTwo
} from './functions'

describe('Testing Day 2 > Functions > getIndexOfUnsafeValue()', () => {
	test('Should return null if array is safe.', () => {
		const input = [1, 2, 3, 4, 5]
		expect(getIndexOfUnsafeValue(input)).toEqual(null)
	})

	test('Should return index of unsafe value.', () => {
		const input = [1, 2, 3, 2, 5]
		expect(getIndexOfUnsafeValue(input)).toEqual(2)
	})
})

describe('Testing Day 2 > Functions > isArrayIncreasing()', () => {
	test('Should return true if array is increasing.', () => {
		const input = [1, 3, 2, 4, 5]
		expect(isArrayIncreasing(input)).toEqual(true)
	})

	test('Should return false if array is not increasing.', () => {
		const input = [1, 5, 4, 3, 2]
		expect(isArrayIncreasing(input)).toEqual(false)
	})
})

describe('Testing Day 2 > Functions > isSafeAfterRemovingValue()', () => {
	test('Should return true if array is safe after removing value.', () => {
		const input = [1, 2, 3, 2, 5]
		expect(isSafeAfterRemovingValue(input, 3)).toEqual(true)
	})

	test('Should return false if array is not safe after removing value.', () => {
		const input = [1, 2, 3, 2, 5]
		expect(isSafeAfterRemovingValue(input, 2)).toEqual(false)
	})
})

describe('Testing Day 2 > Puzzle 1', () => {
	test('Should return 2', () => {
		const inputPath = path.join(__dirname, 'input-sample.txt')
		expect(puzzleOne(inputPath)).toEqual(2)
	})
})

describe('Testing Day 2 > Puzzle 2', () => {
	test('Should return 4', () => {
		const inputPath = path.join(__dirname, 'input-sample.txt')
		expect(puzzleTwo(inputPath)).toEqual(4)
	})
})
