"use strict";
exports.__esModule = true;
var keyBlacklist = ['_'];
function update(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var identifier = INPUT[0] || null;
        if (!identifier) {
            config["debugger"].log('Whoops, `update` must be invoked with a valid `identifier` argument.');
            reject(new Error('Whoops, `update` must be invoked with a valid `identifier` argument.'));
            return;
        }
        var log = config.utils.getLog('active');
        var goals = log.goals;
        var goal = goals[identifier] || null;
        if (!goal) {
            config["debugger"].log("Whoops, failed to find a goal which matches the following identifier: " + identifier);
            reject(new Error("Whoops, failed to find a goal which matches the following identifier: " + identifier));
            return;
        }
        for (var key in ARGS) {
            if (goal[key] !== 'undefined' && keyBlacklist.indexOf(key) === -1) {
                goal[key] = ARGS[key];
            }
        }
        config.utils.writeLog('active', JSON.stringify(log));
        config["debugger"].log("Successfully updated the following properties: " + Object.keys(ARGS).filter(function (key) { return key !== '_'; }).join('; '));
        resolve(goal);
    });
}
exports["default"] = update;
