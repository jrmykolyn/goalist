// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
var add = require('./add');
var complete = require('./complete');
var list = require('./list');
var progress = require('./progress');
var remove = require('./remove');
var update = require('./update');
var version = require('./version');
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
// NOTE: Each subcommand is exposed (and can therefore be invoked) in two ways:
// - By its full name (eg. `add`)
// - By an abbreviation (eg. `a`)
module.exports = {
    add: add,
    a: add,
    complete: complete,
    c: complete,
    list: list,
    l: list,
    progress: progress,
    p: progress,
    remove: remove,
    r: remove,
    update: update,
    u: update,
    version: version,
    v: version
};
