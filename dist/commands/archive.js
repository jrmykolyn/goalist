"use strict";
exports.__esModule = true;
function archive(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var identifier = ARGS._[1] || null;
        if (!identifier) {
            console.log('Whoops, subcommand must be invoked with a valid `identifier` argument.');
            reject(null);
            return;
        }
        var isActive = !ARGS.active;
        var sourceData = isActive ? utils.getLog('active') : utils.getLog('archive');
        var targetData = isActive ? utils.getLog('archive') : utils.getLog('active');
        var goals = sourceData.goals;
        var goal = goals[identifier] || null;
        if (!goal) {
            console.log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        if (isActive) {
            console.log("Deactivating the following task: " + identifier);
            goal.active = false;
        }
        else {
            console.log("Activating the following task: " + identifier);
            goal.active = true;
        }
        delete goals[identifier];
        sourceData.goals = goals;
        targetData.goals = Object.assign(targetData.goals, (_a = {}, _a[identifier] = goal, _a));
        utils.writeLog('active', JSON.stringify(isActive ? sourceData : targetData));
        utils.writeLog('archive', JSON.stringify(isActive ? targetData : sourceData));
        resolve(targetData);
        return;
        var _a;
    });
}
exports["default"] = archive;
