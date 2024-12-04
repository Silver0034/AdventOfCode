const safeMinimumDifference = 1
const safeMaximumDifference = 3

import { getDataAsNumber2DArray } from '../day-1/functions'

// A value is "unsafe" if it is not:
// - All increasing or decreasing
// - Two adjacent levels are not equal or within the safe range
const getIndexOfUnsafeValue = (array: readonly number[]): number | null => {
	const isIncreasing = isArrayIncreasing(array)

	for (let i = 0; i < array.length - 1; i++) {
		// Get the absolute difference between the two numbers
		const difference = Math.abs(array[i] - array[i + 1])

		if (
			(isIncreasing && array[i] > array[i + 1]) || // If should be increasing but decreases
			(!isIncreasing && array[i] < array[i + 1]) || // If should be decreasing but increases
			difference < safeMinimumDifference || // If difference is less than the minimum
			difference > safeMaximumDifference // If difference is more than the maximum
		)
			return i
	}

	return null
}

// Return true/false if the array is (generally) increasing
const isArrayIncreasing = (array: readonly number[]): boolean => {
	const increasingValues = array.filter((value, index) => {
		if (index === 0) return false
		return value > array[index - 1]
	})
	const decreasingValues = array.filter((value, index) => {
		if (index === 0) return false
		return value < array[index - 1]
	})

	return increasingValues.length > decreasingValues.length
}

const isSafeAfterRemovingValue = (
	array: readonly any[],
	index: number
): boolean => {
	let newArray = [...array]
	newArray.splice(index, 1)
	return getIndexOfUnsafeValue(newArray) === null
}

const puzzleOne = (inputPath: string): number | void => {
	const rows = getDataAsNumber2DArray(inputPath)
	if (!rows) return

	const safeReports = rows.filter((row) => {
		return getIndexOfUnsafeValue(row) === null
	})

	return safeReports.length
}

const puzzleTwo = (inputPath: string): number | void => {
	const rows = getDataAsNumber2DArray(inputPath)
	if (!rows) return

	// Get safe reports, but allow up to 1 unsafe value
	const safeReports = rows.filter((row) => {
		const unsafeIndex = getIndexOfUnsafeValue(row)
		if (unsafeIndex === null) return true
		// return unsafeIndex === null
		return (
			isSafeAfterRemovingValue(row, unsafeIndex) ||
			isSafeAfterRemovingValue(row, unsafeIndex + 1)
		)
	})

	return safeReports.length
}

export {
	getIndexOfUnsafeValue,
	isArrayIncreasing,
	isSafeAfterRemovingValue,
	puzzleOne,
	puzzleTwo
}
