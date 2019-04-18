"use strict";
exports.__esModule = true;
function archive(goal, goalist) {
    if (goal.active === true)
        goalist.config["debugger"].log("Activated the following task: " + goal.id);
    if (goal.active === false)
        goalist.config["debugger"].log("Deactivated the following task: " + goal.id);
}
exports["default"] = archive;
