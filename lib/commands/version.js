// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
var pkgDir = require('pkg-dir');
// Project
var pkg = require(pkgDir.sync(__dirname) + "/package.json");
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function version(ARGS, utils) {
    return new Promise(function (resolve, reject) {
        console.log(pkg.version);
        resolve(pkg.version);
    });
}
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = version;
