"use strict";
exports.__esModule = true;
function add(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var title = INPUT[0] || null;
        if (!title) {
            config["debugger"].log('Whoops, `add` must be invoked with a valid `title` argument.');
            reject(new Error('Whoops, `add` must be invoked with a valid `title` argument.'));
            return;
        }
        var log = config.utils.getLog('active');
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
        config.utils.writeLog('active', JSON.stringify(log));
        config["debugger"].log("Successfully created goal: " + id);
        resolve(goal);
    });
}
exports["default"] = add;
