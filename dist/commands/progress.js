"use strict";
exports.__esModule = true;
var barHorizontal = require("bar-horizontal");
function progress(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var log = config.utils.getLog('active');
        var goals = log.goals;
        var total = Object.keys(goals).length;
        var complete = config.utils.getComplete(goals).length;
        var incomplete = total - complete;
        config["debugger"].log('OVERVIEW');
        config["debugger"].log("Total: " + total + "\r");
        config["debugger"].log("Complete: " + complete + "\r");
        config["debugger"].log("Incomplete: " + incomplete + "\n");
        if (config.cli && config["debugger"].getMode() !== 'silent') {
            barHorizontal({
                'Complete': complete,
                'Incomplete': incomplete
            }, {
                labels: true
            });
        }
        resolve({
            type: 'active',
            total: total,
            complete: complete,
            incomplete: incomplete
        });
    });
}
exports["default"] = progress;
