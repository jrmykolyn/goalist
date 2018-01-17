"use strict";
exports.__esModule = true;
var fs = require("fs");
var os = require("os");
var path = require("path");
var pkgDir = require("pkg-dir");
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
    Utils.prototype.getBakPath = function () {
        return this.getGoalistDirPath() + "/bak";
    };
    Utils.prototype.getDirPath = function () {
        return this.getGoalistDirPath() + "/logs";
    };
    Utils.prototype.getLogPath = function (identifier) {
        if (identifier === void 0) { identifier = 'active'; }
        var output;
        var dirPath = this.getDirPath();
        switch (identifier) {
            case 'archive':
                output = dirPath + "/goalist_archive.log";
                break;
            default:
                output = dirPath + "/goalist_active.log";
        }
        return output;
    };
    Utils.prototype.getLog = function (identifier) {
        if (identifier === void 0) { identifier = 'active'; }
        try {
            return this.readLog(this.getLogPath(identifier));
        }
        catch (err) {
            console.log("Whoops, unable to get the following log file: " + identifier);
            console.log(err.message);
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
    Utils.prototype.writeLog = function (identifier, data, options) {
        identifier = (identifier && typeof identifier === 'string') ? identifier : null;
        data = (typeof data !== 'undefined' && data !== null) ? data : null;
        options = (options && typeof options === 'object') ? options : {};
        var resolvedPath;
        switch (identifier) {
            case 'active':
            case 'archive':
                resolvedPath = this.getLogPath(identifier);
                break;
            default:
                resolvedPath = identifier;
        }
        if (!resolvedPath) {
            console.log('Whoops, a missing or invalid value was provided for the following argument: `identifier`');
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
    Utils.prototype.getOrCreateBakDir = function () {
        try {
            return fs.readdirSync(this.getGoalistDirPath() + "/bak");
        }
        catch (err) {
            return fs.mkdirSync(this.getGoalistDirPath() + "/bak");
        }
    };
    Utils.prototype.getOrCreateLog = function (identifier) {
        if (identifier === void 0) { identifier = 'active'; }
        try {
            return fs.readFileSync("" + this.getLogPath(identifier), 'utf8');
        }
        catch (err) {
            var template = this.getLogTemplate();
            return fs.writeFileSync("" + this.getLogPath(identifier), JSON.stringify(template), 'utf8');
        }
    };
    Utils.prototype.getComplete = function (goals) {
        var _this = this;
        if (!goals || typeof goals !== 'object') {
            return null;
        }
        return Object.keys(goals)
            .filter(function (id) { return _this.checkComplete(goals[id]); })
            .map(function (id) { return goals[id]; });
    };
    Utils.prototype.checkComplete = function (goal) {
        if (!goal || typeof goal !== 'object') {
            return null;
        }
        return !!goal.complete;
    };
    return Utils;
}());
exports["default"] = Utils;
