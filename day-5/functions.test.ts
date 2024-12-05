import * as path from 'path'
import {
	getMiddleArrayValue,
	getRulesAndLists,
	isListInValidOrder,
	puzzleOne,
	puzzleTwo,
	sortArrayByRules
} from './functions'

describe('Testing Day 5 > Functions > getMiddleArrayValue()', () => {
	test('should return the middle value for odd length array', () => {
		const array = [1, 2, 3, 4, 5]
		const result = getMiddleArrayValue(array)
		expect(result).toBe(3)
	})

	test('should return the higher middle value for even length array', () => {
		const array = [1, 2, 3, 4, 5, 6]
		const result = getMiddleArrayValue(array)
		expect(result).toBe(4)
	})

	test('should return undefined for empty array', () => {
		const array: number[] = []
		const result = getMiddleArrayValue(array)
		expect(result).toBeUndefined()
	})

	test('should return the only element for single element array', () => {
		const array = [42]
		const result = getMiddleArrayValue(array)
		expect(result).toBe(42)
	})
})

describe('Testing Day 5 > Functions > getRulesAndLists()', () => {
	const inputPath = path.join(__dirname, '/input-sample-2.txt')
	test('should return rules and lists from valid input', () => {
		const result = getRulesAndLists(inputPath)
		expect(result).toEqual({
			rules: [
				[47, 53],
				[97, 13]
			],
			lists: [
				[75, 47, 61, 53, 29],
				[97, 61, 53, 29, 13]
			]
		})
	})

	test('should return empty rules and lists for empty input', () => {
		const input = ''
		const result = getRulesAndLists(input)
		expect(result).toEqual({
			rules: [],
			lists: []
		})
	})
})

describe('Testing Day 5 > Functions > isListInValidOrder()', () => {
	test('should return true for a list that follows the rules', () => {
		const rules = [
			[1, 2],
			[2, 3]
		]
		const list = [1, 2, 3]
		const result = isListInValidOrder(list, rules)
		expect(result).toBe(true)
	})

	test('should return false for a list that does not follow the rules', () => {
		const rules = [
			[1, 2],
			[2, 3]
		]
		const list = [3, 2, 1]
		const result = isListInValidOrder(list, rules)
		expect(result).toBe(false)
	})

	test('should return true for an empty list', () => {
		const rules: [number, number][] = []
		const list: number[] = []
		const result = isListInValidOrder(list, rules)
		expect(result).toBe(true)
	})

	test('should return true for a list with one element', () => {
		const rules: [number, number][] = []
		const list = [42]
		const result = isListInValidOrder(list, rules)
		expect(result).toBe(true)
	})
})

describe('Testing Day 5 > Functions > puzzleOne()', () => {
	const inputPath = path.join(__dirname, '/input-sample.txt')
	test('should return 143 for the given input file', () => {
		const result = puzzleOne(inputPath)
		expect(result).toBe(143)
	})

	test('should return 0 for empty input', () => {
		const input = ''
		const result = puzzleOne(input)
		expect(result).toBe(0)
	})
})

describe('Testing Day 5 > Functions > puzzleTwo()', () => {
	const inputPath = path.join(__dirname, '/input-sample.txt')
	test('should return 123 for the given input file', () => {
		const result = puzzleTwo(inputPath)
		expect(result).toBe(123)
	})

	test('should return 0 for empty input', () => {
		const input = ''
		const result = puzzleTwo(input)
		expect(result).toBe(0)
	})
})

describe('Testing Day 5 > Functions > sortArrayByRules()', () => {
	test('should sort the array according to the rules', () => {
		const rules = [
			[1, 2],
			[2, 3]
		]
		const array = [3, 1, 2]
		const result = sortArrayByRules(array, rules)
		console.log({ result })
		expect(result).toEqual([3, 1, 2])
	})

	test('should return the same array if it is already sorted', () => {
		const rules = [
			[1, 2],
			[2, 3]
		]
		const array = [1, 2, 3]
		const result = sortArrayByRules(array, rules)
		expect(result).toEqual([1, 2, 3])
	})

	test('should handle an empty array', () => {
		const rules: [number, number][] = []
		const array: number[] = []
		const result = sortArrayByRules(array, rules)
		expect(result).toEqual([])
	})

	test('should handle an array with one element', () => {
		const rules: [number, number][] = []
		const array = [42]
		const result = sortArrayByRules(array, rules)
		expect(result).toEqual([42])
	})

	test('should return the same array if it cannot be sorted', () => {
		const rules = [
			[1, 2],
			[2, 3]
		]
		const array = [4, 3, 1, 2]
		const result = sortArrayByRules(array, rules)
		expect(result).toEqual([4, 3, 1, 2])
	})
})
