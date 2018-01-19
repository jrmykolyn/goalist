"use strict";
exports.__esModule = true;
var commands = require("./commands");
var utils_1 = require("./utils");
var debugger_1 = require("./debugger");
var Goalist = (function () {
    function Goalist() {
    }
    Goalist.prototype.run = function (COMMAND, INPUT, ARGS) {
        if (COMMAND === void 0) { COMMAND = ''; }
        if (INPUT === void 0) { INPUT = []; }
        if (ARGS === void 0) { ARGS = {}; }
        var utils = new utils_1["default"](ARGS.utilsOpts);
        return new Promise(function (resolve, reject) {
            if (!COMMAND || typeof COMMAND !== 'string') {
                console.log('Whoops, `goalist` must be executed with a valid command.');
                reject(null);
                return;
            }
            INPUT = (Array.isArray(INPUT) && INPUT.length) ? INPUT : typeof INPUT === 'string' ? [INPUT] : [];
            ARGS = (ARGS && typeof ARGS === 'object') ? ARGS : {};
            debugger_1["default"].verbose(!!ARGS.verbose);
            var goalistDirData = utils.getOrCreateGoalistDir();
            var logsDirData = utils.getOrCreateLogsDir();
            var bakDirData = utils.getOrCreateBakDir();
            var activeLogData = utils.getOrCreateLog('active');
            var archiveLogData = utils.getOrCreateLog('archive');
            if (COMMAND in commands) {
                commands[COMMAND](INPUT, ARGS, utils).then(resolve, reject);
            }
            else {
                console.log('Whoops, `goalist` was invoked with an invalid command.');
                reject(null);
                return;
            }
        });
    };
    return Goalist;
}());
module.exports = Goalist;
