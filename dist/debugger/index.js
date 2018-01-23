"use strict";
exports.__esModule = true;
var Debugger = (function () {
    function Debugger(opts) {
        if (opts === void 0) { opts = {}; }
        opts = opts && typeof opts === 'object' ? opts : {};
        this.mode = ['silent', 'normal', 'verbose'].includes(opts.mode) ? opts.mode : 'silent';
    }
    Debugger.prototype.setMode = function (mode) {
        this.mode = mode;
        return this.mode;
    };
    Debugger.prototype.getMode = function () {
        return this.mode;
    };
    Debugger.prototype.log = function (msg, opts) {
        if (opts === void 0) { opts = {}; }
        opts = opts && typeof opts === 'object' ? opts : {};
        if (this.mode === 'verbose') {
            console.log(msg);
        }
        else if (this.mode !== 'silent' && !opts.mode) {
            console.log(msg);
        }
    };
    return Debugger;
}());
exports["default"] = Debugger;
