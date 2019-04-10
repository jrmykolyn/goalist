"use strict";
exports.__esModule = true;
function add(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var title = INPUT[0] || null;
        if (!title) {
            var err = 'Whoops, `add` must be invoked with a valid `title` argument.';
            config["debugger"].log(err);
            reject(new Error(err));
            return;
        }
        var log = config.utils.getLog('active');
        var goals = log.goals;
        var id = config.utils.generateId();
        var goal = {
            id: id,
            title: title,
            category: ARGS.category || '',
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
