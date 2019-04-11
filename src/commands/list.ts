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
export default function list( INPUT, ARGS, config ) {
	return new Promise( ( resolve, reject ) => {
		let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
		let { goals } = log;

		let whitelistProps = [ 'id', 'title' ]; // Props. to always display.
		let supplementaryProps = !ARGS.all && ARGS.show ? ARGS.show.split( ',' ).filter( ( prop ) => whitelistProps.indexOf( prop ) === -1 ) : []; // Set 'supplementary' if possible.

		const allGoals = Object.keys( goals ).map( ( key ) => goals[ key ] );
		const filteredGoals = ARGS.category
			? allGoals.filter( ( { category } ) => !!category && category.toLowerCase().includes( ARGS.category.toLowerCase() ) )
			: allGoals;

		// Print out info for each `goal` in current log.
		filteredGoals.forEach( ( goal ) => {
			// Update `supplementaryProps` for current `goal`.
			/// NOTE: Since not all `goal` objects are exactly the same, `supplementaryProps` must be updated within each loop iteration.
			/// TODO[@jrmykolyn]: Normalize shape of `goal`.
			if ( ARGS.all ) {
				supplementaryProps = Object.keys( goal ).filter( ( prop ) => whitelistProps.indexOf( prop ) === -1 );
			}

			whitelistProps.concat( supplementaryProps ).forEach( ( prop ) => {
				if ( goal.hasOwnProperty( prop ) ) {
					config.debugger.log( `${chalk.gray( prop + ':' )} ${goal[ prop ]}` );
				}
			} );

			config.debugger.log( '\n' );
		} );

		resolve( log );
	} );
}
