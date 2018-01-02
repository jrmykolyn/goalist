"use strict";
exports.__esModule = true;
function list(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var log = utils.getLog('active');
        var goals = log.goals;
        var outputKeys = null;
        Object.keys(goals).forEach(function (key) {
            var goal = goals[key];
            outputKeys = (ARGS.only && typeof ARGS.only === 'string') ? ARGS.only.split(',') : Object.keys(goal);
            console.log("Identifier: " + key);
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
