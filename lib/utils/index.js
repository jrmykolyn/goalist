// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var fs = require('fs');
var os = require('os');
var path = require('path');
// Vendor
var moment = require('moment');
var pkgDir = require('pkg-dir');
// Project
var Debugger = require('../debugger');
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var root = pkgDir.sync(__dirname);
// NOTE:
// - `self` used as 'stand in' for static/class variables, which throw runtime errors.
/// TODO:
// - Update class definition to use class variables.
var self = {};
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
var Utils = /** @class */ (function () {
    function Utils(opts) {
        opts = (opts && typeof opts === 'object') ? opts : {};
        if (!self.ref) {
            /// TODO: Gross...
            this.goalistDirName = (opts.path && typeof opts.path === 'string') ? path.parse(opts.path).name : '.goalist';
            this.goalistDirRoot = (opts.path && typeof opts.path === 'string') ? path.parse(opts.path).dir : os.homedir();
            this.goalistDirPath = (opts.path && typeof opts.path === 'string') ? opts.path : this.goalistDirRoot + "/" + this.goalistDirName;
            self.ref = this;
        }
        return self.ref;
    }
    Utils.prototype.getGoalistDirName = function () {
        return this.goalistDirName;
    };
    Utils.prototype.getGoalistDirPath = function () {
        return this.goalistDirPath;
    };
    Utils.prototype.readGoalistDir = function () {
        return fs.readdirSync(this.getGoalistDirPath(), 'utf8');
    };
    Utils.prototype.getDirPath = function () {
        return this.getGoalistDirPath() + "/logs";
    };
    Utils.prototype.getTodayHandle = function () {
        var d = new Date();
        // NOTE: Take into account UTC offset when calculating 'today'.
        var today = new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000));
        var year = today.getFullYear();
        var month = (today.getUTCMonth() + 1);
        var day = today.getUTCDate();
        // Ensure that `month`/`day` identifiers are always two characters (eg. '09'). Required for sorting purposes.
        month = (month >= 10) ? month : '0' + month;
        day = (day >= 10) ? day : '0' + day;
        var todayDirName = year + "-" + month + "-" + day;
        return todayDirName;
    };
    Utils.prototype.getTodayLogName = function () {
        return "goalist_" + this.getTodayHandle() + ".log";
    };
    Utils.prototype.getTodayLogPath = function () {
        return this.getDirPath() + "/" + this.getTodayLogName();
    };
    Utils.prototype.readTodayLog = function () {
        try {
            return this.readLog(this.getTodayLogPath());
        }
        catch (err) {
            console.log('Whoops, unable to get log file for current day!');
            /// TODO[@jrmykolyn]: Consider only logging error message if program is running in 'verbose' mode.
            console.log(err.message);
            return null;
        }
    };
    Utils.prototype.getLatestLogName = function () {
        try {
            var logs = this.getLogNames();
            if (!logs || !Array.isArray(logs) || !logs.length) {
                throw new Error('Failed to fetch log files.');
            }
            var latestLog = logs.filter(function (log) {
                return log.substring(0, 1) !== '.'; /// TODO[@jrmykolyn]: Filter by regex/pattern match.
            })
                .sort()
                .reverse()[0];
            if (!latestLog) {
                throw new Error('Failed to extract latest log file from collection');
            }
            return latestLog;
        }
        catch (err) {
            return null;
        }
    };
    Utils.prototype.getLatestLogPath = function () {
        var dirPath = this.getDirPath();
        var latestLog = this.getLatestLogName();
        return (dirPath && latestLog) ? dirPath + "/" + latestLog : null;
    };
    Utils.prototype.readLatestLog = function () {
        try {
            return this.readLog(this.getLatestLogPath());
        }
        catch (err) {
            return null;
        }
    };
    Utils.prototype.getLogName = function (identifier) {
        identifier = (identifier && typeof identifier === 'string') ? identifier : null;
        if (!identifier) {
            Debugger.log('Received invalid argument for `identifier`');
            return null;
        }
        return "goalist_" + identifier + ".log";
    };
    Utils.prototype.getLogPath = function (identifier) {
        var logName = this.getLogName(identifier);
        var dirPath = this.getDirPath(identifier); /// TODO: Revisit.
        return (logName && dirPath) ? dirPath + "/" + logName : null;
    };
    /// TODO: Consolidate with `readLog()`.
    Utils.prototype.getLog = function (identifier) {
        try {
            return this.readLog(this.getLogPath(identifier));
        }
        catch (err) {
            return null;
        }
    };
    /// TODO: Update method name and references: `getLogNames()`.
    Utils.prototype.getLogNames = function () {
        try {
            return fs.readdirSync(this.getDirPath(), 'utf8');
        }
        catch (err) {
            return null;
        }
    };
    Utils.prototype.readLog = function (path, options) {
        path = (path && typeof path === 'string') ? path : null;
        options = (options && typeof options === 'object') ? options : {};
        if (!path) {
            console.log('Received invalid argument for `path`');
            return;
        }
        try {
            return JSON.parse(fs.readFileSync(path), 'utf8');
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
    };
    /// TODO:
    // - Change `target` to something... better.
    // - Revisit.
    Utils.prototype.writeLog = function (target, data, options) {
        target = (target && typeof target === 'string') ? target : null;
        data = (typeof data !== 'undefined' && data !== null) ? data : null;
        options = (options && typeof options === 'object') ? options : {};
        var resolvedPath;
        switch (target) {
            case 'today':
                resolvedPath = is.getTodayLogPath();
                break;
            default:
                resolvedPath = target;
        }
        if (!resolvedPath) {
            console.log('Whoops, a missing or invalid value was provided for the following argument: `target`');
            return;
        }
        try {
            fs.writeFileSync(resolvedPath, data, 'utf8');
            return true;
        }
        catch (err) {
            return false;
        }
    };
    Utils.prototype.getLogTemplate = function () {
        return JSON.parse(fs.readFileSync(root + "/data/goalist.log"));
    };
    Utils.prototype.getOrCreateGoalistDir = function () {
        // Create `goalist` directory if it doesn't exist.
        try {
            return fs.readdirSync("" + this.getGoalistDirPath());
        }
        catch (err) {
            return fs.mkdirSync("" + this.getGoalistDirPath());
        }
    };
    Utils.prototype.getOrCreateLogsDir = function () {
        // Create `logs` directory if it doesn't exist.
        try {
            return fs.readdirSync("" + this.getDirPath());
        }
        catch (err) {
            return fs.mkdirSync("" + this.getDirPath());
        }
    };
    Utils.prototype.getOrCreateTodayLog = function () {
        // Create log file for current day if it doesn't exist.
        try {
            return fs.readFileSync("" + this.getTodayLogPath(), 'utf8');
        }
        catch (err) {
            // Fetch: template; latest log data.
            var template = this.getLogTemplate();
            var latestLog = this.readLatestLog();
            var latestGoals = (latestLog && latestLog.goals) ? latestLog.goals : {};
            // Remove any goals which are not 'incomplete'.
            for (var key in latestGoals) {
                var goal = latestGoals[key];
                if (goal.status !== 'incomplete') {
                    delete latestGoals[key];
                }
            }
            // Update template with additional 'goals'.
            template.goals = Object.assign(template.goals, latestGoals);
            // Write data to file system.
            return fs.writeFileSync("" + this.getTodayLogPath(), JSON.stringify(template), 'utf8');
        }
    };
    return Utils;
}());
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Utils;
