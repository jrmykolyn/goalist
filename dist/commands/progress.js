"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
function progress(INPUT, ARGS, config) {
    var log = ARGS.archive ? config.utils.getLog('archive') : config.utils.getLog('active');
    var goals = log.goals;
    var total = Object.keys(goals).length;
    var complete = config.utils.getComplete(goals).length;
    var incomplete = total - complete;
    return {
        type: ARGS.archive ? 'archive' : 'active',
        total: total,
        complete: complete,
        incomplete: incomplete
    };
}
exports["default"] = utils_1["default"](progress, [function () { return Promise.resolve(); }]);
