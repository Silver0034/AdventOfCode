import * as fs from 'fs'

export type NumberArray = number[]
export type NumberArrayArray = number[][]

// Get columns of values from file as arrays
export const getValueArraysFromFile = (filePath: string): NumberArrayArray => {
	console.log('Getting values from file:', filePath)
	let returnValues = [] as NumberArrayArray

	let data = getValueFromFile(filePath)
	if (!data) return returnValues

	// Split the data into rows
	const rows = data.split('\n')
	if (!rows) return returnValues

	const rowValues = rows.map((row) => getValuesFromRow(row))

	returnValues = addValuesToColumns(rowValues, returnValues)

	return returnValues
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

const addValuesToColumns = (
	rowValues: NumberArrayArray,
	returnValues: NumberArrayArray
) => {
	rowValues.forEach((values) => {
		values.forEach((value, index) => {
			if (!returnValues[index]) returnValues[index] = []
			returnValues[index].push(value)
		})
	})

	return returnValues
}
