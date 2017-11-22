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
// - `_self` used as 'stand in' for static/class variables, which throw runtime errors.
/// TODO:
// - Update class definition to use class variables.
const _self: any = {};

// --------------------------------------------------
// DEFINE CLASSES
// --------------------------------------------------
export default class Debugger {
	/**
	 * Set the internal `verboseMode` property to `state`.
	 *
	 * @param {boolean} state
	 */
	static verbose( state ) {
		_self.verboseMode = !!state;
	}

	/**
	 * Log a message to stdout if the debugger is running in `verboseMode`.
	 *
	 * @param {any} msg
	 */
	static log( msg ) {
		if ( _self.verboseMode ) {
			console.log( msg );
		}
	}
}
