"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
var validators_1 = require("../validators");
function add(INPUT, ARGS, config) {
    var title = INPUT[0] || null;
    var log = config.utils.getLog('active');
    var goals = log.goals;
    var id = config.utils.generateId();
    var timestamp = config.utils.getTimestamp();
    var goal = {
        id: id,
        title: title,
        category: ARGS.category || '',
        description: ARGS.description || '',
        tags: ARGS.tags ? ARGS.tags.split(',').map(function (str) { return str.trim(); }) : [],
        complete: false,
        active: true,
        createdAt: timestamp,
        updatedAt: timestamp
    };
    goals[id] = goal;
    config.utils.writeLog('active', JSON.stringify(log));
    return goal;
}
exports["default"] = utils_1["default"](add, [validators_1.hasValidInput({ msg: 'Whoops, `add` must be invoked with a valid `title` argument.' })]);
