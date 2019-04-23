"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var validators_1 = require("../validators");
function archive(INPUT, ARGS, config) {
    var _a;
    var identifier = INPUT[0] || null;
    var isActive = !ARGS.active;
    var sourceData = isActive ? config.utils.getLog('active') : config.utils.getLog('archive');
    var targetData = isActive ? config.utils.getLog('archive') : config.utils.getLog('active');
    var goals = sourceData.goals;
    var goal = goals[identifier] || null;
    if (!goal) {
        var err = "Whoops, failed to find a goal which matches the following identifier: " + identifier;
        config["debugger"].log(err);
        throw new Error(err);
        return;
    }
    if (isActive) {
        config["debugger"].log("Deactivating the following task: " + identifier);
        goal.active = false;
    }
    else {
        config["debugger"].log("Activating the following task: " + identifier);
        goal.active = true;
    }
    delete goals[identifier];
    sourceData.goals = goals;
    targetData.goals = Object.assign(targetData.goals, (_a = {}, _a[identifier] = goal, _a));
    config.utils.writeLog('active', JSON.stringify(isActive ? sourceData : targetData));
    config.utils.writeLog('archive', JSON.stringify(isActive ? targetData : sourceData));
    return targetData;
}
exports["default"] = utils_1["default"](archive, [validators_1.hasValidInput({ msg: 'Whoops, `archive` must be invoked with a valid `identifier` argument.' })]);
