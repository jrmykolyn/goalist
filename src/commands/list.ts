// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function list( ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		let log = utils.getLog( 'active' );
		let { goals } = log;
		let outputKeys = null;

		// Print out info for each `goal` in current log.
		Object.keys( goals ).forEach( function( key ) {
			let goal = goals[ key ];

			// Update `outputKeys` for current `goal`.
			/// TODO[@jrmykolyn]: Move this outside of loop.
			/// NOTE: Since not all `goal` objects are exactly the same, `outputKeys` must be updated within each loop iteration.
			outputKeys = ( ARGS.only && typeof ARGS.only === 'string' ) ? ARGS.only.split( ',' ) : Object.keys( goal );

			// Always log out ID of current goal.
			console.log( `Identifier: ${key}` );

			// Conditionally log out additional goal info.
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
