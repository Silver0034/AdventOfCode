"use strict";
exports.__esModule = true;
exports.getValueArraysFromFile = void 0;
// Global constants
var inputFile = './input.txt';
// Imports / Dependencies
var fs = require("fs");
// Get the values from a file
var getValueFromFile = function (filePath) {
    var returnValue = '';
    try {
        returnValue = fs.readFileSync(filePath, 'utf8');
    }
    catch (err) {
        console.error(err);
    }
    return returnValue;
};
// Get values from text row separated by spaces
var getValuesFromRow = function (row) {
    var values = row
        .replace(/\r?\n|\r/g, '') // remove line breaks
        .split(/\s+/g); // split on spaces
    return values.map(function (value) { return Number(value); });
};
var addValuesToColumns = function (rowValues, returnValues) {
    rowValues.forEach(function (values) {
        values.forEach(function (value, index) {
            if (!returnValues[index])
                returnValues[index] = [];
            returnValues[index].push(value);
        });
    });
    return returnValues;
};
var sortArrayByValue = function (array, direction) {
    if (direction === void 0) { direction = 'asc'; }
    if (direction === 'asc') {
        return array.sort(function (a, b) { return a - b; });
    }
    else {
        return array.sort(function (a, b) { return b - a; });
    }
};
// Get columns of values from file as arrays
var getValueArraysFromFile = function (filePath) {
    console.log('Getting values from file:', filePath);
    var returnValues = [];
    var data = getValueFromFile(filePath);
    if (!data)
        return returnValues;
    // Split the data into rows
    var rows = data.split('\n');
    if (!rows)
        return returnValues;
    var rowValues = rows.map(function (row) { return getValuesFromRow(row); });
    returnValues = addValuesToColumns(rowValues, returnValues);
    return returnValues;
};
exports.getValueArraysFromFile = getValueArraysFromFile;
var run = function () {
    console.log('Day 1: Puzzle 1.');
    // Get input from text file.
    var values = (0, exports.getValueArraysFromFile)(inputFile);
    console.log('Computing answer...');
    // Sort both by length, shortest first
    var _a = values.map(function (column) {
        return sortArrayByValue(column);
    }), columnOne = _a[0], columnTwo = _a[1];
    // Make a new array to hold the differences between each value pair
    var differences = [];
    var length = columnOne.length > columnTwo.length
        ? columnOne.length
        : columnTwo.length;
    for (var i = 0; i < length; i++) {
        var valueOne = columnOne[i] || 0;
        var valueTwo = columnTwo[i] || 0;
        var difference = Math.abs(valueOne - valueTwo);
        differences.push(difference);
    }
    // add up and return the sum of the differences
    var sum = differences.reduce(function (a, b) { return a + b; }, 0);
    console.log('Sum of differences:', sum);
};
run();
