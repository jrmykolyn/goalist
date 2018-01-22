"use strict";
exports.__esModule = true;
var keyBlacklist = ['_'];
function update(INPUT, ARGS, utils, d) {
    return new Promise(function (resolve, reject) {
        var identifier = INPUT[0] || null;
        if (!identifier) {
            d.log('Whoops, `update` must be invoked with a valid `identifier` argument.');
            reject(null);
            return;
        }
        var log = utils.getLog('active');
        var goals = log.goals;
        var goal = goals[identifier] || null;
        if (!goal) {
            d.log('Whoops, failed to find a goal which matches the following identifier:', identifier);
            reject(null);
            return;
        }
        for (var key in ARGS) {
            if (goal[key] !== 'undefined' && keyBlacklist.indexOf(key) === -1) {
                goal[key] = ARGS[key];
            }
        }
        utils.writeLog('active', JSON.stringify(log));
        d.log("Successfully updated the following properties: " + Object.keys(ARGS).filter(function (key) { return key !== '_'; }).join('; '));
        resolve(log);
    });
}
exports["default"] = update;
