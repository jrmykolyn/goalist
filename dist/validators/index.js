"use strict";
exports.__esModule = true;
exports.hasValidInput = function (_a) {
    var _b = (_a === void 0 ? {} : _a).msg, msg = _b === void 0 ? '' : _b;
    return function (INPUT, ARGS, config) {
        var input = INPUT[0];
        if (!input)
            throw new Error(msg || 'Whoops, something went wrong!');
    };
};
