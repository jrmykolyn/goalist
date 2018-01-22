"use strict";
exports.__esModule = true;
function add(INPUT, ARGS, utils, d) {
    return new Promise(function (resolve, reject) {
        var title = INPUT[0] || null;
        if (!title) {
            d.log('Whoops, `add` must be invoked with a valid `title` argument.');
            reject(null);
            return;
        }
        var log = utils.getLog('active');
        var goals = log.goals;
        var id = new Date().getTime();
        var goal = {
            id: id,
            title: title,
            description: ARGS.description || '',
            complete: false,
            active: true
        };
        goals[id] = goal;
        utils.writeLog('active', JSON.stringify(log));
        d.log("Successfully created goal: " + id);
        resolve(goal);
    });
}
exports["default"] = add;
