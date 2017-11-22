"use strict";
exports.__esModule = true;
var fs = require("fs");
var os = require("os");
var path = require("path");
var pkgDir = require("pkg-dir");
var merge = require("merge");
var debugger_1 = require("../debugger");
var root = pkgDir.sync(__dirname);
var Utils = (function () {
    function Utils(opts) {
        opts = (opts && typeof opts === 'object') ? opts : {};
        this.goalistDirName = (opts.path && typeof opts.path === 'string') ? path.parse(opts.path).name : '.goalist';
        this.goalistDirRoot = (opts.path && typeof opts.path === 'string') ? path.parse(opts.path).dir : os.homedir();
        this.goalistDirPath = (opts.path && typeof opts.path === 'string') ? opts.path : this.goalistDirRoot + "/" + this.goalistDirName;
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
        var today = new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000));
        var year = today.getFullYear();
        var month = (today.getUTCMonth() + 1);
        var day = today.getUTCDate();
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
                return log.substring(0, 1) !== '.';
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
            debugger_1["default"].log('Received invalid argument for `identifier`');
            return null;
        }
        return "goalist_" + identifier + ".log";
    };
    Utils.prototype.getLogPath = function (identifier) {
        var logName = this.getLogName(identifier);
        var dirPath = this.getDirPath();
        return (logName && dirPath) ? dirPath + "/" + logName : null;
    };
    Utils.prototype.getLog = function (identifier) {
        try {
            return this.readLog(this.getLogPath(identifier));
        }
        catch (err) {
            return null;
        }
    };
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
            return JSON.parse(fs.readFileSync(path, 'utf8'));
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
    };
    Utils.prototype.writeLog = function (target, data, options) {
        target = (target && typeof target === 'string') ? target : null;
        data = (typeof data !== 'undefined' && data !== null) ? data : null;
        options = (options && typeof options === 'object') ? options : {};
        var resolvedPath;
        switch (target) {
            case 'today':
                resolvedPath = this.getTodayLogPath();
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
        return JSON.parse(fs.readFileSync(root + "/data/goalist.log", 'utf8'));
    };
    Utils.prototype.getOrCreateGoalistDir = function () {
        try {
            return fs.readdirSync("" + this.getGoalistDirPath());
        }
        catch (err) {
            return fs.mkdirSync("" + this.getGoalistDirPath());
        }
    };
    Utils.prototype.getOrCreateLogsDir = function () {
        try {
            return fs.readdirSync("" + this.getDirPath());
        }
        catch (err) {
            return fs.mkdirSync("" + this.getDirPath());
        }
    };
    Utils.prototype.getOrCreateTodayLog = function () {
        try {
            return fs.readFileSync("" + this.getTodayLogPath(), 'utf8');
        }
        catch (err) {
            var template = this.getLogTemplate();
            var latestLog = this.readLatestLog();
            var latestGoals = (latestLog && latestLog.goals) ? latestLog.goals : {};
            for (var key in latestGoals) {
                var goal = latestGoals[key];
                if (goal.status !== 'incomplete') {
                    delete latestGoals[key];
                }
            }
            template.goals = merge(template.goals, latestGoals);
            return fs.writeFileSync("" + this.getTodayLogPath(), JSON.stringify(template), 'utf8');
        }
    };
    return Utils;
}());
exports["default"] = Utils;
