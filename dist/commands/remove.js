"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var validators_1 = require("../validators");
function remove(INPUT, ARGS, config) {
    var identifier = INPUT[0] || null;
    var log = ARGS.archive ? config.utils.getLog('archive') : config.utils.getLog('active');
    var goals = log.goals;
    var goal = goals[identifier] || null;
    var userConf = null;
    if (!goal) {
        throw new Error("Whoops, failed to find a goal which matches the following identifier: " + identifier);
    }
    if (!config.cli || ARGS.force) {
        for (var key in goals) {
            if (goals[key] === goal) {
                delete goals[key];
            }
        }
        config.utils.writeLog(ARGS.archive ? 'archive' : 'active', JSON.stringify(log));
        return goal;
    }
    else {
        throw new Error('This is a destructive action and can only be executed if the `--force` flag is provided. Aborting.');
    }
}
exports["default"] = utils_1["default"](remove, [validators_1.hasValidInput({ msg: 'Whoops, `remove` must be invoked with a valid `identifier` argument.' })]);
