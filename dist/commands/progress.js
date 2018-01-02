"use strict";
exports.__esModule = true;
var barHorizontal = require("bar-horizontal");
function progress(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var log = utils.readActiveLog();
        var goals = log.goals;
        var totalGoals = Object.keys(goals).length;
        var numComplete = Object.keys(goals).filter(function (id) { return goals[id].status !== 'incomplete'; }).length;
        var numIncomplete = totalGoals - numComplete;
        console.log("OVERVIEW");
        console.log("Total: " + totalGoals + "\r");
        console.log("Complete: " + numComplete + "\r");
        console.log("Incomplete: " + numIncomplete + "\n");
        barHorizontal({
            'Complete': numComplete,
            'Incomplete': numIncomplete
        }, { labels: true });
        resolve(log);
    });
}
exports["default"] = progress;
