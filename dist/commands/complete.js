"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var validators_1 = require("../validators");
function complete(INPUT, ARGS, config) {
    var identifier = INPUT[0] || null;
    var log = ARGS.archive ? config.utils.getLog('archive') : config.utils.getLog('active');
    var goals = log.goals;
    var goal = goals[identifier] || null;
    if (!goal) {
        var err = "Whoops, failed to find a goal which matches the following identifier: " + identifier;
        throw new Error(err);
    }
    goal.complete = ARGS["false"] ? false : true;
    goal.updatedAt = config.utils.getTimestamp();
    config.utils.writeLog(ARGS.archive ? 'archive' : 'active', JSON.stringify(log));
    return goal;
}
exports["default"] = utils_1["default"](complete, [validators_1.hasValidInput({ msg: 'Whoops, `complete` must be invoked with a valid `identifier` argument.' })]);
