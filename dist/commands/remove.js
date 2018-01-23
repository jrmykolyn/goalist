"use strict";
exports.__esModule = true;
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
        if (!config.cli || ARGS.force) {
            config["debugger"].log("Removing task: " + identifier);
            for (var key in goals) {
                if (goals[key] === goal) {
                    delete goals[key];
                }
            }
            config.utils.writeLog(ARGS.archive ? 'archive' : 'active', JSON.stringify(log));
            resolve(log);
            return;
        }
        else {
            config["debugger"].log('This is a destructive action and can only be executed if the `--force` flag is provided. Aborting.');
            reject(log);
            return;
        }
    });
}
exports["default"] = remove;
