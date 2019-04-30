"use strict";
exports.__esModule = true;
var fs = require("fs");
var utils_1 = require("./utils");
function backup(INPUT, ARGS, config) {
    var log = ARGS.archive ? config.utils.getLog('archive') : config.utils.getLog('active');
    try {
        fs.writeFileSync(config.utils.getBakPath() + "/goalist_" + (ARGS.archive ? 'archive' : 'active') + "_" + new Date().getTime() + ".bak", JSON.stringify(log), 'utf8');
        return {
            msg: "Successfully backed up log: " + (ARGS.archive ? 'archive' : 'active'),
            payload: log
        };
    }
    catch (err) {
        throw new Error("Failed to back up log: " + (ARGS.archive ? 'archive' : 'active'));
    }
}
exports["default"] = utils_1["default"](backup, [function () { return Promise.resolve(); }]);
