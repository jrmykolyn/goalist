// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor

// Project
import { DebuggerInstance } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DEFINE CLASSES
// --------------------------------------------------
export default class Debugger implements DebuggerInstance {
	mode: string;

	constructor( opts: any = {} ) {
		opts = opts && typeof opts === 'object' ? opts : {};

		this.mode = [ 'silent', 'normal', 'verbose' ].includes( opts.mode ) ? opts.mode : 'silent';
	}

	/**
	 * Set the internal `mode` property.
	 *
	 * @param {string} mode
	 */
	setMode( mode: string ): string {
		this.mode = mode;

		return this.mode;
	}

	/**
	 * Get the internal `mode` property.
	 */
	getMode(): string {
		return this.mode;
	}

	/**
	 * Conditionally log a message to stdout.
	 *
	 * @param {string} msg
	 * @param {Object} opts
	 */
	log( msg: string, opts: any = {} ) {
		opts = opts && typeof opts === 'object' ? opts : {};

		// Log the `msg` if:
		// - We're running in 'verbose' mode...
		// - ...or the current mode is not 'silent *and* `log()` was not invoked with `opts.mode`.
		if ( this.mode === 'verbose' ) {
			console.log( msg );
		} else if ( this.mode !== 'silent' && !opts.mode ) {
			console.log( msg );
		}
	}
}
