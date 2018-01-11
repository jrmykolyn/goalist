"use strict";
exports.__esModule = true;
function list(INPUT, ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var displayArchive = ARGS.archive;
        var log = displayArchive ? utils.getLog('archive') : utils.getLog('active');
        var goals = log.goals;
        var outputKeys = null;
        Object.keys(goals).forEach(function (key) {
            var goal = goals[key];
            outputKeys = (ARGS.only && typeof ARGS.only === 'string') ? ARGS.only.split(',') : Object.keys(goal);
            for (var prop in goal) {
                if (outputKeys.includes(prop)) {
                    console.log(prop + ": " + goal[prop] + "\r");
                }
            }
            console.log('\n');
        });
        resolve(log);
    });
}
exports["default"] = list;
