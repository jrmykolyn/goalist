"use strict";
exports.__esModule = true;
var _self = {};
var Debugger = (function () {
    function Debugger() {
    }
    Debugger.verbose = function (state) {
        _self.verboseMode = !!state;
    };
    Debugger.log = function (msg) {
        if (_self.verboseMode) {
            console.log(msg);
        }
    };
    return Debugger;
}());
exports["default"] = Debugger;
