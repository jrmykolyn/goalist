"use strict";
exports.__esModule = true;
var fs = require("fs");
var os = require("os");
var path = require("path");
var pkgDir = require("pkg-dir");
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
    Utils.prototype.getActiveLogName = function () {
        return 'goalist_active.log';
    };
    Utils.prototype.getActiveLogPath = function () {
        return this.getDirPath() + "/" + this.getActiveLogName();
    };
    Utils.prototype.readActiveLog = function () {
        try {
            return this.readLog(this.getActiveLogPath());
        }
        catch (err) {
            console.log('Whoops, unable to get log file for current day!');
            console.log(err.message);
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
            case 'active':
                resolvedPath = this.getActiveLogPath();
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
    Utils.prototype.getOrCreateActiveLog = function () {
        try {
            return fs.readFileSync("" + this.getActiveLogPath(), 'utf8');
        }
        catch (err) {
            var template = this.getLogTemplate();
            return fs.writeFileSync("" + this.getActiveLogPath(), JSON.stringify(template), 'utf8');
        }
    };
    return Utils;
}());
exports["default"] = Utils;
