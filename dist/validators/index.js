"use strict";
exports.__esModule = true;
exports.hasValidTitle = function (INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var title = INPUT[0];
        if (!title) {
            reject(new Error('Whoops, `add` must be invoked with a valid `title` argument.'));
        }
        else {
            resolve();
        }
    });
};
