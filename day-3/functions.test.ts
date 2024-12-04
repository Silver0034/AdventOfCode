import * as path from 'path'
import {
	getMulParamsFromString,
	getSumOfMultiplierValues,
	puzzleOne,
	puzzleTwo
} from './functions'

describe('Testing Day 3 > getMulParamsFromString', () => {
	test('The input string includes bits with mul({number},{number}). Return those numbers as a 2D array.', () => {
		const input = 'mul(1,2) mul(3,4) mul(5,6)'
		expect(getMulParamsFromString(input)).toEqual([
			[1, 2],
			[3, 4],
			[5, 6]
		])
	})
})

describe('Testing Day 3 > getSumOfMultiplierValues', () => {
	test('The input string includes bits with mul({number},{number}). Return the sum of the multiplied values.', () => {
		const input = 'mul(1,2) mul(3,4) mul(5,6)'
		expect(getSumOfMultiplierValues(input)).toEqual(1 * 2 + 3 * 4 + 5 * 6)
	})
})

describe('Testing Day 3 > Puzzle 1', () => {
	test('The sample input return 161', () => {
		const inputPath = path.join(__dirname, 'input-sample.txt')
		expect(puzzleOne(inputPath)).toEqual(161)
	})
})

describe('Testing Day 3 > Puzzle 2', () => {
	test('Sample input 2 should return 48', () => {
		const inputPath = path.join(__dirname, 'input-sample-2.txt')
		expect(puzzleTwo(inputPath)).toEqual(48)
	})
})
