"use strict";
exports.__esModule = true;
var readline = require("readline");
function remove(INPUT, ARGS, utils, d) {
    return new Promise(function (resolve, reject) {
        var identifier = INPUT[0] || null;
        if (!identifier) {
            d.log('Whoops, `remove` must be invoked with a valid `identifier` argument.');
            reject(null);
            return;
        }
        var log = ARGS.archive ? utils.getLog('archive') : utils.getLog('active');
        var goals = log.goals;
        var goal = goals[identifier] || null;
        var userConf = null;
        if (!goal) {
            d.log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Please note, this is a destructive action! Do you wish to continue? (y/n)\n', function (response) {
            if (response.toString().toLowerCase() === 'y') {
                d.log("Removing task: " + identifier);
                for (var key in goals) {
                    if (goals[key] === goal) {
                        delete goals[key];
                    }
                }
                utils.writeLog(ARGS.archive ? 'archive' : 'active', JSON.stringify(log));
                resolve(log);
            }
            else {
                d.log("Aborting.");
                reject(log);
            }
            rl.close();
            return;
        });
    });
}
exports["default"] = remove;
