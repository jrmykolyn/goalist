"use strict";
exports.__esModule = true;
var readline = require("readline");
function remove(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var identifier = INPUT[0] || null;
        if (!identifier) {
            config["debugger"].log('Whoops, `remove` must be invoked with a valid `identifier` argument.');
            reject(null);
            return;
        }
        var log = ARGS.archive ? config.utils.getLog('archive') : config.utils.getLog('active');
        var goals = log.goals;
        var goal = goals[identifier] || null;
        var userConf = null;
        if (!goal) {
            config["debugger"].log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        if (config.cli) {
            rl.question('Please note, this is a destructive action! Do you wish to continue? (y/n)\n', function (response) {
                if (response.toString().toLowerCase() === 'y') {
                    config["debugger"].log("Removing task: " + identifier);
                    for (var key in goals) {
                        if (goals[key] === goal) {
                            delete goals[key];
                        }
                    }
                    config.utils.writeLog(ARGS.archive ? 'archive' : 'active', JSON.stringify(log));
                    resolve(log);
                }
                else {
                    config["debugger"].log('Aborting.');
                    reject(log);
                }
                rl.close();
                return;
            });
        }
        else {
            config["debugger"].log("Removing task: " + identifier);
            for (var key in goals) {
                if (goals[key] === goal) {
                    delete goals[key];
                }
            }
            config.utils.writeLog(ARGS.archive ? 'archive' : 'active', JSON.stringify(log));
            resolve(log);
        }
    });
}
exports["default"] = remove;
