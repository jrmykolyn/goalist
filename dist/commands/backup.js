"use strict";
exports.__esModule = true;
var fs = require("fs");
function backup(INPUT, ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var log = ARGS.archive ? utils.getLog('archive') : utils.getLog('active');
        try {
            fs.writeFileSync(utils.getBakPath() + "/goalist_" + (ARGS.archive ? 'archive' : 'active') + "_" + new Date().getTime() + ".bak", JSON.stringify(log), 'utf8');
            console.log("Successfully backed up log: " + (ARGS.archive ? 'archive' : 'active'));
            resolve(log);
            return;
        }
        catch (err) {
            console.log("Failed to back up log: " + (ARGS.archive ? 'archive' : 'active'));
            reject(err);
            return;
        }
    });
}
exports["default"] = backup;
