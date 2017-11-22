"use strict";
exports.__esModule = true;
var pkgDir = require("pkg-dir");
var pkg = require(pkgDir.sync(__dirname) + "/package.json");
function version(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        console.log(pkg.version);
        resolve(pkg.version);
    });
}
exports["default"] = version;
