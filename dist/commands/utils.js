"use strict";
exports.__esModule = true;
var makeCommand = function (command, validators) {
    if (validators === void 0) { validators = []; }
    return function (input, args, config) {
        return Promise.all(validators.map(function (validator) { return validator(input, args, config); }))
            .then(function () { return command(input, args, config); })["catch"](function (err) { throw err; });
    };
};
exports["default"] = makeCommand;
