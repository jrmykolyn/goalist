"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
function add(INPUT, ARGS, config) {
    var title = INPUT[0] || null;
    var log = config.utils.getLog('active');
    var goals = log.goals;
    var id = config.utils.generateId();
    var goal = {
        id: id,
        title: title,
        category: ARGS.category || '',
        description: ARGS.description || '',
        tags: ARGS.tags ? ARGS.tags.split(',').map(function (str) { return str.trim(); }) : [],
        complete: false,
        active: true
    };
    goals[id] = goal;
    config.utils.writeLog('active', JSON.stringify(log));
    config["debugger"].log("Successfully created goal: " + id);
    return goal;
}
var hasValidTitle = function (INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var title = INPUT[0];
        if (!title) {
            reject(new Error('Whoops, `add` must be invoked with a valid `title` argument.'));
        }
        else {
            resolve();
        }
    });
};
exports["default"] = utils_1["default"](add, [hasValidTitle]);
