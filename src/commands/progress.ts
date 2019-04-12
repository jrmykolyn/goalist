// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
import * as barHorizontal from 'bar-horizontal';

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function progress( INPUT, ARGS, config ) {
	return new Promise( ( resolve, reject ) => {
		let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
		let { goals } = log;

		let total = Object.keys( goals ).length;
		let complete = config.utils.getComplete( goals ).length;
		let incomplete = total - complete;

		config.debugger.log( 'OVERVIEW' );
		config.debugger.log( `Total: ${total}\r` );
		config.debugger.log( `Complete: ${complete}\r` );
		config.debugger.log( `Incomplete: ${incomplete}\n` );

		// Only display bar chars when:
		// - command was executed from CLI;
		// - Goalist is not running in 'silent' mode.
		if ( config.cli && config.debugger.getMode() !== 'silent' ) {
			barHorizontal(
				{
					'Complete': complete,
					'Incomplete': incomplete,
				},
				{
					labels: true,
				},
			);
		}

		resolve( {
			type: ARGS.archive ? 'archive' : 'active',
			total,
			complete,
			incomplete,
		} );
	} );
}
