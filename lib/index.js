// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
var pkgDir = require('pkg-dir');
// Project
var commands = require('./commands');
var Utils = require("./utils");
var Debugger = require('./debugger');
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var utils = new Utils();
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
var Goalist = /** @class */ (function () {
    function Goalist(arr) {
        this.COMMAND = arr[0];
        this.ARGS = arr[1];
    }
    Goalist.prototype.preflight = function (arr) {
        var COMMAND = this.COMMAND || arr[0];
        var ARGS = this.ARGS || arr[1];
        return new Promise(function (resolve, reject) {
            // Ensure that `gl` is invoked with at least 1x arg.
            if (!ARGS._[0]) {
                console.log('Whoops, `goalist` must be executed with a valid command.');
                reject(null);
                return;
            }
            // Set Debugger mode based on args.
            Debugger.verbose(!!ARGS.verbose);
            /// TODO: Consider building out wrapper function around `getOrCreate*()` methods.
            var goalistDirData = utils.getOrCreateGoalistDir();
            var logsDirData = utils.getOrCreateLogsDir();
            var todayLogData = utils.getOrCreateTodayLog();
            // Validate `COMMAND`, log error message otherwise.
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
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Goalist;
