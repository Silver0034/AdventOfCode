import { getDataAsNumber2DArray, sumArray } from '../day-1/functions'

const getMiddleArrayValue = (array: number[]): number => {
	const middleIndex = Math.floor(array.length / 2)
	return array[middleIndex]
}

const getRulesAndLists = (inputPath: string) => {
	// Get the data from the file
	// Split on | or ,
	const data = getDataAsNumber2DArray(inputPath, /[\|,]/gs)
	if (!data) return { rules: [], lists: [] }

	// Get the index of [NaN] to split the data into rules / lists
	const splitIndex = data.findIndex((row) => row.includes(NaN))

	// Get the rules and lists
	const rules = data.slice(0, splitIndex)
	const lists = data.slice(splitIndex + 1)

	return { rules, lists }
}

const isListInValidOrder = (list: number[], rules: number[][]): boolean => {
	for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
		const [firstRule, secondRule] = rules[ruleIndex]

		const firstIndex = list.indexOf(firstRule)
		const secondIndex = list.indexOf(secondRule)

		// Skip if either number is not in the list
		if (firstIndex === -1 || secondIndex === -1) continue

		// Return false if the second number is before the first number
		if (secondIndex < firstIndex) return false
	}

	// Default to true
	return true
}

/**
 * The input has two sections: the first are page order rules, and
 * they looks like:
 *
 * 47|53
 * 97|13
 *
 * And the second are lists of page numbers.
 * 75,47,61,53,29
 * 97,61,53,29,13
 *
 * We need to find out which list of page numbers are valid
 * (following the order rules). The first number in an order rule
 * must come before the second number. They do not have to be right
 * next to each other. For each of the valid lists, take the
 * middle page numbers and sum them together and return the sum.
 *
 */
const puzzleOne = (inputPath: string): number | void => {
	const { rules, lists } = getRulesAndLists(inputPath)
	if (!rules || !lists) return

	const validLists = lists.filter((list) => isListInValidOrder(list, rules))

	const middleNumbers = validLists.map((list) => getMiddleArrayValue(list))

	// return the sum of the middle numbers
	return sumArray(middleNumbers)
}

/**
 * Take the same input format as puzzle one, but take all of the invalid lists,
 * sort them to be valid, and then sum the middle numbers of each list.
 */
const puzzleTwo = (inputPath: string): number | void => {
	const { rules, lists } = getRulesAndLists(inputPath)
	if (!rules || !lists) return

	const invalidLists = lists.filter(
		(list) => !isListInValidOrder(list, rules)
	)

	// Make all invalid lists valid
	const sortedLists = invalidLists.map((list) =>
		sortArrayByRules(list, rules)
	)

	const middleNumbers = sortedLists.map((list) => getMiddleArrayValue(list))

	// return the sum of the middle numbers
	return sumArray(middleNumbers)
}

const sortArrayByRules = (array: number[], rules: number[][]): number[] => {
	return array.sort((a, b) => {
		for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
			const [firstRule, secondRule] = rules[ruleIndex]

			if (firstRule === a && secondRule === b) return -1
			if (firstRule === b && secondRule === a) return 1
		}
	})
}

export {
	getMiddleArrayValue,
	getRulesAndLists,
	isListInValidOrder,
	puzzleOne,
	puzzleTwo,
	sortArrayByRules
}
