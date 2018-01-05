"use strict";
exports.__esModule = true;
function complete(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var identifier = ARGS._[1] || null;
        if (!identifier) {
            console.log('Whoops, subcommand must be invoked with a valid `identifier` argument.');
            reject(null);
            return;
        }
        var log = utils.getLog('active');
        var goals = log.goals;
        var goal = goals[identifier] || null;
        if (!goal) {
            console.log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        if (ARGS["false"]) {
            console.log("Setting the following task to incomplete: " + identifier);
            goal.complete = false;
        }
        else {
            console.log("Setting the following task to complete: " + identifier);
            goal.complete = true;
        }
        utils.writeLog('active', JSON.stringify(log));
        resolve(log);
        return;
    });
}
exports["default"] = complete;
