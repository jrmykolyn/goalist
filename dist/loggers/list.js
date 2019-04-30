"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
function list(goals, goalist) {
    goals.forEach(function (goal) {
        Object.keys(goal).forEach(function (key) {
            if (goal.hasOwnProperty(key)) {
                goalist.config["debugger"].log(chalk_1["default"].gray(key + ':') + " " + goal[key]);
            }
        });
        goalist.config["debugger"].log('\r');
    });
}
exports["default"] = list;
