// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
// Project
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// NOTE:
// - `self` used as 'stand in' for static/class variables, which throw runtime errors.
/// TODO:
// - Update class definition to use class variables.
var self = {};
// --------------------------------------------------
// DEFINE CLASSES
// --------------------------------------------------
var Debugger = /** @class */ (function () {
    function Debugger() {
    }
    /**
     * Set the internal `verboseMode` property to `state`.
     *
     * @param {boolean} state
     */
    Debugger.verbose = function (state) {
        self.verboseMode = !!state;
    };
    /**
     * Log a message to stdout if the debugger is running in `verboseMode`.
     *
     * @param {any} msg
     */
    Debugger.log = function (msg) {
        if (self.verboseMode) {
            console.log(msg);
        }
    };
    return Debugger;
}());
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Debugger;
