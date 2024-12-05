import * as path from 'path'
import {
	getCoordinatesOfCharacterInMatrix,
	getCountOfWordInMatrix,
	getStringDownLeft,
	getStringDownRight,
	getStringHorizontal,
	getStringVertical,
	puzzleOne,
	puzzleTwo,
	reverseString
} from './functions'

const input = [
	['a', 'f', 'c'],
	['d', 'e', 'f'],
	['g', 'h', 'i']
]

describe('Testing Day 4 > Functions > getCoordinatesOfCharacterInMatrix()', () => {
	test('Expect empty array as result from invalid input', () => {
		expect(getCoordinatesOfCharacterInMatrix(input, '')).toEqual([])
	})

	test('Expect [[0, 1],[1, 2]] as result from sample input', () => {
		expect(getCoordinatesOfCharacterInMatrix(input, 'f')).toEqual([
			[0, 1],
			[1, 2]
		])
	})
})

describe('Testing Day 4 > Functions > getStringDownLeft()', () => {
	test('Expect shortened string if along left edge', () => {
		expect(getStringDownLeft([0, 0], 2, input)).toEqual('a')
	})
	test('Get down left from [1, 1] with length 2', () => {
		expect(getStringDownLeft([1, 1], 2, input)).toEqual('eg')
	})
})

describe('Testing Day 4 > Functions > getStringDownRight()', () => {
	test('Expect empty string if along right edge', () => {
		expect(getStringDownRight([2, 2], 2, input)).toEqual('i')
	})
	test('Get down right from [1, 1] with length 2', () => {
		expect(getStringDownRight([1, 1], 2, input)).toEqual('ei')
	})
})

describe('Testing Day 4 > Functions > getStringHorizontal()', () => {
	test('Expect empty string if along right edge', () => {
		expect(getStringHorizontal([2, 2], 2, input)).toEqual('i')
	})
	test('Get right from [1, 1] with length 2', () => {
		expect(getStringHorizontal([1, 1], 2, input)).toEqual('ef')
	})
})

describe('Testing Day 4 > Functions > getStringVertical()', () => {
	test('Expect empty string if along bottom edge', () => {
		expect(getStringVertical([2, 2], 2, input)).toEqual('i')
	})
	test('Get down from [1, 1] with length 2', () => {
		expect(getStringVertical([1, 1], 2, input)).toEqual('eh')
	})
})

describe('Testing Day 4 > Functions > getCountOfWordInMatrix()', () => {
	test('Expect 0 as result from invalid input', () => {
		expect(getCountOfWordInMatrix('', [])).toEqual(0)
	})

	test('Expect 1 as result from sample input', () => {
		expect(
			getCountOfWordInMatrix('hi', [
				['i', 'i', 'i'],
				['i', 'h', 'i'],
				['i', 'i', 'i']
			])
		).toEqual(8)
	})
})

describe('Testing Day 4 > Functions > puzzleOne()', () => {
	test('Expect void as result from invalid input', () => {
		expect(puzzleOne('')).toBeUndefined()
	})

	test('Expect 11 as result from sample input', () => {
		expect(puzzleOne(path.join(__dirname, '/input-sample-2.txt'))).toEqual(
			18
		)
	})
})

describe('Testing Day 4 > Functions > puzzleTwo()', () => {
	test('Expect void as result from invalid input', () => {
		expect(puzzleTwo('')).toBeUndefined()
	})

	test('Expect 6 as result from sample input', () => {
		expect(puzzleTwo(path.join(__dirname, '/input-sample-2.txt'))).toEqual(
			9
		)
	})
})

describe('Testing Day 4 > Functions > reverseString()', () => {
	test('Expect "" as result from ""', () => {
		expect(reverseString('')).toEqual('')
	})
	test('Expect "cba" as result from "abc"', () => {
		expect(reverseString('abc')).toEqual('cba')
	})
})
