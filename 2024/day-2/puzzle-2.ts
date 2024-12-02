// Global constants
const inputFile = './input.txt'

// Imports / Dependencies
import {
	getRowsFromInputAsArrays,
	getIndexOfUnsafeLevel,
	isReportSafe
} from './utilities'

const isSafeAfterRemovingValue = (row: any[], index: number): boolean => {
	let cleanedRow = [...row]
	cleanedRow.splice(index, 1)
	return isReportSafe(cleanedRow)
}

const isSafeWithOrWithoutRemovingValues = (row: number[]): boolean => {
	const unsafeIndex = getIndexOfUnsafeLevel(row)
	if (unsafeIndex === null) return true

	return (
		isSafeAfterRemovingValue(row, unsafeIndex) ||
		isSafeAfterRemovingValue(row, unsafeIndex + 1)
	)
}

const run = () => {
	console.log('Day 2: Puzzle 2.')
	// Get input from text file.
	const rows = getRowsFromInputAsArrays(inputFile)

	const safeReports = rows.filter(isSafeWithOrWithoutRemovingValues)

	console.log('# of safe reports:', safeReports.length)
}

run()
