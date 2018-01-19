"use strict";
exports.__esModule = true;
var commands = require("./commands");
var utils_1 = require("./utils");
var debugger_1 = require("./debugger");
var Goalist = (function () {
    function Goalist(options) {
        if (options === void 0) { options = {}; }
        options = (options && typeof options === 'object') ? options : {};
        this.utilsRef = new utils_1["default"](options.utilsOpts);
    }
    Goalist.prototype.run = function (COMMAND, INPUT, ARGS) {
        var _this = this;
        if (COMMAND === void 0) { COMMAND = ''; }
        if (INPUT === void 0) { INPUT = []; }
        if (ARGS === void 0) { ARGS = {}; }
        return new Promise(function (resolve, reject) {
            if (!COMMAND || typeof COMMAND !== 'string') {
                console.log('Whoops, `goalist` must be executed with a valid command.');
                reject(null);
                return;
            }
            INPUT = (Array.isArray(INPUT) && INPUT.length) ? INPUT : typeof INPUT === 'string' ? [INPUT] : [];
            ARGS = (ARGS && typeof ARGS === 'object') ? ARGS : {};
            debugger_1["default"].verbose(!!ARGS.verbose);
            var goalistDirData = _this.utilsRef.getOrCreateGoalistDir();
            var logsDirData = _this.utilsRef.getOrCreateLogsDir();
            var bakDirData = _this.utilsRef.getOrCreateBakDir();
            var activeLogData = _this.utilsRef.getOrCreateLog('active');
            var archiveLogData = _this.utilsRef.getOrCreateLog('archive');
            if (COMMAND in commands) {
                commands[COMMAND](INPUT, ARGS, _this.utilsRef).then(resolve, reject);
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
