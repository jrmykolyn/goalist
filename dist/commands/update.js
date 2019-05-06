"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var validators_1 = require("../validators");
var keyBlacklist = ['_'];
function update(INPUT, ARGS, config) {
    var identifier = INPUT[0] || null;
    var log = config.utils.getLog('active');
    var goals = log.goals;
    var goal = goals[identifier] || null;
    if (!goal) {
        throw new Error("Whoops, failed to find a goal which matches the following identifier: " + identifier);
    }
    for (var key in ARGS) {
        if (goal[key] !== 'undefined' && keyBlacklist.indexOf(key) === -1) {
            goal[key] = ARGS[key];
        }
    }
    goal.updatedAt = config.utils.getTimestamp();
    config.utils.writeLog('active', JSON.stringify(log));
    return {
        msg: "Successfully updated the following properties: " + Object.keys(ARGS).filter(function (key) { return key !== '_'; }).join('; '),
        payload: goal
    };
}
exports["default"] = utils_1["default"](update, [validators_1.hasValidInput({ msg: 'Whoops, `update` must be invoked with a valid `identifier` argument.' })]);
