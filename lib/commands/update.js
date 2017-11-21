// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var fs = require('fs');
// Vendor
var Promise = require('bluebird');
// Project
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var keyBlacklist = ['_'];
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function update(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var identifier = ARGS._[1] || null;
        if (!identifier) {
            console.log('Whoops, `update` must be invoked with a valid `identifier` argument.');
            reject(null);
            return;
        }
        var log = utils.readTodayLog();
        var goals = log.goals;
        var goal = goals[identifier] || null;
        if (!goal) {
            console.log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        // Update selected `goal`.
        for (var key in ARGS) {
            if (goal[key] !== 'undefined' && !keyBlacklist.includes(key)) {
                goal[key] = ARGS[key];
            }
        }
        // Write new data back to file system.
        utils.writeLog('today', JSON.stringify(log));
        resolve(log);
    });
}
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = update;
