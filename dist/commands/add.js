"use strict";
exports.__esModule = true;
function add(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var title = ARGS._[1] || null;
        if (!title) {
            console.log('Whoops, `add` must be invoked with a valid `title` argument.');
            reject(null);
            return;
        }
        var log = utils.readTodayLog();
        var goals = log.goals;
        var id = new Date().getTime();
        var goal = {
            id: id,
            title: ARGS._[1],
            status: 'incomplete',
            description: ARGS.description || ''
        };
        goals[id] = goal;
        utils.writeLog('today', JSON.stringify(log));
        console.log("Successfully created goal: " + id);
        resolve(log);
    });
}
exports["default"] = add;
