// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
var Promise = require('bluebird');
var barHorizontal = require('bar-horizontal');
// Project
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function progress(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var log = utils.readTodayLog();
        var goals = log.goals;
        /// TODO[@jrmykolyn]: Consider pulling 'get incomplete'/'get complete' logic into dedicated `utils` methods.
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
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = progress;
