"use strict";
exports.__esModule = true;
function complete(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var identifier = INPUT[0] || null;
        if (!identifier) {
            config["debugger"].log('Whoops, subcommand must be invoked with a valid `identifier` argument.');
            reject(new Error('Whoops, subcommand must be invoked with a valid `identifier` argument.'));
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
        if (ARGS["false"]) {
            config["debugger"].log("Setting the following task to incomplete: " + identifier);
            goal.complete = false;
        }
        else {
            config["debugger"].log("Setting the following task to complete: " + identifier);
            goal.complete = true;
        }
        config.utils.writeLog('active', JSON.stringify(log));
        resolve(goal);
        return;
    });
}
exports["default"] = complete;
