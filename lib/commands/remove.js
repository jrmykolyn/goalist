// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var fs = require('fs');
var readline = require('readline');
// Vendor
var Promise = require('bluebird');
// Project
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function remove(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var identifier = ARGS._[1] || null;
        if (!identifier) {
            console.log('Whoops, `remove` must be invoked with a valid `identifier` argument.');
            reject(null);
            return;
        }
        var log = utils.readTodayLog();
        var goals = log.goals;
        var goal = goals[identifier] || null;
        var userConf = null;
        if (!goal) {
            console.log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        /// TODO[@jrmykolyn]: Convert nested callback to Promise chain if possible.
        rl.question('Please note, this is a destructive action! Do you wish to continue? (y/n)\r', function (response) {
            if (response.toString().toLowerCase() === 'y') {
                console.log("Removing task: " + identifier);
                for (var key in goals) {
                    if (goals[key] === goal) {
                        delete goals[key];
                    }
                }
                // Write new data back to file system.
                utils.writeLog('today', JSON.stringify(log));
                resolve(log);
            }
            else {
                console.log("Aborting.");
                reject(log);
            }
            rl.close();
            return;
        });
    });
}
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = remove;
