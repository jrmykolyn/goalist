// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
var Promise = require('bluebird');
// Project
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function list(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var log = utils.readTodayLog();
        var goals = log.goals;
        var outputKeys = null;
        // Print out info for each `goal` in current log.
        Object.keys(goals).forEach(function (key) {
            var goal = goals[key];
            // Update `outputKeys` if not already set.
            /// TODO[@jrmykolyn]: Move this outside of loop.
            if (!outputKeys) {
                outputKeys = (ARGS.only && typeof ARGS.only === 'string') ? ARGS.only.split(',') : Object.keys(goal);
            }
            // Always log out ID of current goal.
            console.log("Identifier: " + key);
            // Conditional log out additional goal info.
            for (var prop in goal) {
                if (outputKeys.includes(prop)) {
                    console.log(prop + ": " + goal[prop] + "\r");
                }
            }
            console.log('\n');
        });
        resolve(log);
    });
}
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = list;
