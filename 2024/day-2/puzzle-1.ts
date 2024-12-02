// Global constants
const inputFile = './input.txt'

// Imports / Dependencies
import { getRowsFromInputAsArrays, isReportSafe } from './utilities'

// Each row in the input is a report.
// To be safe, the levels in each report must be all increasing or all decreasing.
// Two adjacent levels can only differ by at least 1, or at most 3.

console.log('Day 2: Puzzle 1.')
// Get input from text file.
const rows = getRowsFromInputAsArrays(inputFile)

const safeReports = rows.filter((row) => isReportSafe(row))

console.log('# of safe reports:', safeReports.length)
