"use strict";
exports.__esModule = true;
function complete(goal, goalist) {
    if (goal.complete === true)
        goalist.config["debugger"].log("Setting the following task to complete: " + goal.id);
    if (goal.complete === false)
        goalist.config["debugger"].log("Setting the following task to incomplete: " + goal.id);
}
exports["default"] = complete;
