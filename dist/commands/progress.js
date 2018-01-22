"use strict";
exports.__esModule = true;
var barHorizontal = require("bar-horizontal");
function progress(INPUT, ARGS, utils, d) {
    return new Promise(function (resolve, reject) {
        var log = utils.getLog('active');
        var goals = log.goals;
        var totalGoals = Object.keys(goals).length;
        var numComplete = utils.getComplete(goals).length;
        var numIncomplete = totalGoals - numComplete;
        d.log('OVERVIEW');
        d.log("Total: " + totalGoals + "\r");
        d.log("Complete: " + numComplete + "\r");
        d.log("Incomplete: " + numIncomplete + "\n");
        barHorizontal({
            'Complete': numComplete,
            'Incomplete': numIncomplete
        }, { labels: true });
        resolve(log);
    });
}
exports["default"] = progress;
