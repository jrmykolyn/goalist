// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const Promise = require( 'bluebird' );

// Project
const utils = require( '../../utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function list( ARGS ) {
	return new Promise( ( resolve, reject ) => {
		let log = utils.readTodayLog();
		let { goals } = log;
		let outputKeys = null;

		// Print out info for each `goal` in current log.
		Object.keys( goals ).forEach( function( key ) {
			let goal = goals[ key ];

			// Update `outputKeys` if not already set.
			/// TODO[@jrmykolyn]: Move this outside of loop.
			if ( !outputKeys ) {
				outputKeys = ( ARGS.only && typeof ARGS.only === 'string' ) ? ARGS.only.split( ',' ) : Object.keys( goal );
			}

			// Always log out ID of current goal.
			console.log( `Identifier: ${key}` );

			// Conditional log out additional goal info.
			for ( let prop in goal ) {
				if ( outputKeys.includes( prop ) ) {
					console.log(  `${prop}: ${goal[ prop ]}\r`  );
				}
			}

			console.log( '\n' );
		} );

		resolve( log );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = list;
