"use strict";
exports.__esModule = true;
function progress(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var log = ARGS.archive ? config.utils.getLog('archive') : config.utils.getLog('active');
        var goals = log.goals;
        var total = Object.keys(goals).length;
        var complete = config.utils.getComplete(goals).length;
        var incomplete = total - complete;
        resolve({
            type: ARGS.archive ? 'archive' : 'active',
            total: total,
            complete: complete,
            incomplete: incomplete
        });
    });
}
exports["default"] = progress;
