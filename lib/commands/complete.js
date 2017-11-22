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
        var log = utils.readTodayLog();
        var goals = log.goals;
        var goal = goals[identifier] || null;
        if (!goal) {
            console.log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        if (ARGS["false"]) {
            console.log("Setting the following tast to 'incomplete': " + identifier);
            goal.status = 'incomplete';
        }
        else {
            console.log("Setting the following tast to 'complete': " + identifier);
            goal.status = 'complete';
        }
        utils.writeLog('today', JSON.stringify(log));
        resolve(log);
        return;
    });
}
exports["default"] = complete;
