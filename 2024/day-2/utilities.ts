const safeMinimumDifference = 1
const safeMaximumDifference = 3

import * as fs from 'fs'

export type NumberArray = number[]
export type NumberArrayArray = number[][]

// Get rows of values from file as arrays
export const getRowsFromInputAsArrays = (
	filePath: string
): NumberArrayArray => {
	console.log('Getting values from file:', filePath)
	let returnValues = [] as NumberArrayArray

	let data = getValueFromFile(filePath)
	if (!data) return returnValues

	// Split the data into rows
	const rows = data.split('\n')
	if (!rows) return returnValues

	const rowValues = rows.map((row) => getValuesFromRow(row))

	returnValues.push(...rowValues)

	return returnValues
}

export const getIndexOfUnsafeLevel = (report: NumberArray): number | null => {
	// compare the first value to all other values, if there are more increasing, then it is increasing or vice versa
	const increasingValues = report.filter((value, index) => {
		if (index === 0) return false
		return value > report[index - 1]
	})
	const decreasingValues = report.filter((value, index) => {
		if (index === 0) return false
		return value < report[index - 1]
	})

	const isIncreasing = increasingValues.length > decreasingValues.length

	for (let i = 0; i < report.length - 1; i++) {
		// Get the absolute difference between the two numbers
		const difference = Math.abs(report[i] - report[i + 1])

		if (
			(isIncreasing && report[i] > report[i + 1]) || // If should be increasing but decreases
			(!isIncreasing && report[i] < report[i + 1]) || // If should be decreasing but increases
			difference < safeMinimumDifference || // If difference is less than the minimum
			difference > safeMaximumDifference // If difference is more than the maximum
		)
			return i
	}

	return null
}

export const isReportSafe = (report: NumberArray): boolean => {
	if (getIndexOfUnsafeLevel(report) !== null) return false
	return true
}

// Get the values from a file
const getValueFromFile = (filePath: string): string => {
	let returnValue = ''

	try {
		returnValue = fs.readFileSync(filePath, 'utf8')
	} catch (err) {
		console.error(err)
	}

	return returnValue
}

// Get values from text row separated by spaces
const getValuesFromRow = (row: string): NumberArray => {
	const values = row
		.replace(/\r?\n|\r/g, '') // remove line breaks
		.split(/\s+/g) // split on spaces

	return values.map((value) => Number(value))
}
