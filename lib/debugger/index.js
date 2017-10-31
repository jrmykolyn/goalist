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
const self = {};

// --------------------------------------------------
// DEFINE CLASSES
// --------------------------------------------------
class Debugger {
	/**
	 * Set the internal `verboseMode` property to `state`.
	 *
	 * @param {boolean} state
	 */
	static verbose( state ) {
		self.verboseMode = !!state;
	}

	/**
	 * Log a message to stdout if the debugger is running in `verboseMode`.
	 *
	 * @param {any} msg
	 */
	static log( msg ) {
		if ( self.verboseMode ) {
			console.log( msg );
		}
	}
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Debugger;
