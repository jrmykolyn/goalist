"use strict";
exports.__esModule = true;
var commands = require("./commands");
var utils_1 = require("./utils");
var debugger_1 = require("./debugger");
var utils = new utils_1["default"]();
var Goalist = (function () {
    function Goalist(arr) {
        this.COMMAND = arr[0];
        this.ARGS = arr[1];
    }
    Goalist.prototype.preflight = function (arr) {
        var COMMAND = this.COMMAND || arr[0];
        var ARGS = this.ARGS || arr[1];
        return new Promise(function (resolve, reject) {
            if (!ARGS._[0]) {
                console.log('Whoops, `goalist` must be executed with a valid command.');
                reject(null);
                return;
            }
            debugger_1["default"].verbose(!!ARGS.verbose);
            var goalistDirData = utils.getOrCreateGoalistDir();
            var logsDirData = utils.getOrCreateLogsDir();
            var todayLogData = utils.getOrCreateTodayLog();
            if (COMMAND in commands) {
                resolve([COMMAND, ARGS]);
                return;
            }
            else {
                console.log('Whoops, `goalist` was invoked with an invalid command.');
                reject(null);
                return;
            }
        });
    };
    Goalist.prototype.run = function (arr) {
        var COMMAND = this.COMMAND || arr[0];
        var ARGS = this.ARGS || arr[1];
        return new Promise(function (resolve, reject) {
            if (COMMAND in commands) {
                commands[COMMAND](ARGS, utils).then(resolve, reject);
            }
            else {
                reject(null);
            }
        });
    };
    return Goalist;
}());
module.exports = Goalist;
