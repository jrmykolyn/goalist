"use strict";
exports.__esModule = true;
function complete(INPUT, ARGS, utils, d) {
    return new Promise(function (resolve, reject) {
        var identifier = INPUT[0] || null;
        if (!identifier) {
            d.log('Whoops, subcommand must be invoked with a valid `identifier` argument.');
            reject(null);
            return;
        }
        var log = utils.getLog('active');
        var goals = log.goals;
        var goal = goals[identifier] || null;
        if (!goal) {
            d.log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        if (ARGS["false"]) {
            d.log("Setting the following task to incomplete: " + identifier);
            goal.complete = false;
        }
        else {
            d.log("Setting the following task to complete: " + identifier);
            goal.complete = true;
        }
        utils.writeLog('active', JSON.stringify(log));
        resolve(log);
        return;
    });
}
exports["default"] = complete;
