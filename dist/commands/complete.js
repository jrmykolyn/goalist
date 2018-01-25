"use strict";
exports.__esModule = true;
function complete(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var identifier = INPUT[0] || null;
        if (!identifier) {
            var err = 'Whoops, subcommand must be invoked with a valid `identifier` argument.';
            config["debugger"].log(err);
            reject(new Error(err));
            return;
        }
        var log = ARGS.archive ? config.utils.getLog('archive') : config.utils.getLog('active');
        var goals = log.goals;
        var goal = goals[identifier] || null;
        if (!goal) {
            var err = "Whoops, failed to find a goal which matches the following identifier: " + identifier;
            config["debugger"].log(err);
            reject(new Error(err));
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
        config.utils.writeLog(ARGS.archive ? 'archive' : 'active', JSON.stringify(log));
        resolve(goal);
        return;
    });
}
exports["default"] = complete;
