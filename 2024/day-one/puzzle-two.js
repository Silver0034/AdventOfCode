"use strict";
exports.__esModule = true;
var inputFile = './input.txt';
var puzzle_one_1 = require("./puzzle-one");
var returnSimilarityScoreForValue = function (targetValue, array) {
    var count = array.filter(function (item) { return item === targetValue; }).length;
    return targetValue * count;
};
/**
 * Create a similarity score by adding each number in the left list after
 * multiplying it by the number of times it appears in the right list.
 */
var run = function () {
    console.log('Day 1: Puzzle 1.');
    // Get input from text file.
    var _a = (0, puzzle_one_1.getValueArraysFromFile)(inputFile), columnOne = _a[0], columnTwo = _a[1];
    console.log('Computing answer...');
    var similarityScore = columnOne.map(function (value) {
        return returnSimilarityScoreForValue(value, columnTwo);
    });
    var total = similarityScore.reduce(function (acc, value) { return acc + value; }, 0);
    console.log('Total:', total);
};
run();
