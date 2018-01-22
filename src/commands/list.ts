// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const chalk = require( 'chalk' );

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function list( INPUT, ARGS, utils, d ) {
	return new Promise( ( resolve, reject ) => {
		let log = ARGS.archive ? utils.getLog( 'archive' ) : utils.getLog( 'active' );
		let { goals } = log;

		let whitelistProps = [ 'id', 'title' ]; // Props. to always display.
		let supplementaryProps = !ARGS.all && ARGS.show ? ARGS.show.split( ',' ).filter( ( prop ) => whitelistProps.indexOf( prop ) === -1 ) : []; // Set 'supplementary' if possible.

		// Print out info for each `goal` in current log.
		Object.keys( goals ).forEach( ( key ) => {
			let goal = goals[ key ];

			// Update `supplementaryProps` for current `goal`.
			/// NOTE: Since not all `goal` objects are exactly the same, `supplementaryProps` must be updated within each loop iteration.
			/// TODO[@jrmykolyn]: Normalize shape of `goal`.
			if ( ARGS.all ) {
				supplementaryProps = Object.keys( goal ).filter( ( prop ) => whitelistProps.indexOf( prop ) === -1 );
			}

			whitelistProps.concat( supplementaryProps ).forEach( ( prop ) => {
				if ( goal.hasOwnProperty( prop ) ) {
					d.log( `${chalk.gray( prop + ':' )} ${goal[ prop ]}` );
				}
			} );

			d.log( '\n' );
		} );

		resolve( log );
	} );
}
