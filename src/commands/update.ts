// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendor

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const keyBlacklist = [ '_' ];

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function update( INPUT, ARGS, config ) {
	return new Promise( ( resolve, reject ) => {
		let identifier = INPUT[ 0 ] || null;

		if ( !identifier ) {
			let err = 'Whoops, `update` must be invoked with a valid `identifier` argument.';

			config.debugger.log( err );
			reject( new Error( err ) );
			return;
		}

		let log = config.utils.getLog( 'active' );
		let { goals } = log;
		let goal = goals[ identifier ] || null;

		if ( !goal ) {
			let err = `Whoops, failed to find a goal which matches the following identifier: ${identifier}`;

			config.debugger.log( err );
			reject( new Error( err ) );
			return;
		}

		// Update selected `goal`.
		for ( let key in ARGS ) {
			if ( goal[ key ] !== 'undefined' && keyBlacklist.indexOf( key ) === -1 ) {
				goal[ key ] = ARGS[ key ];
			}
		}

		// Write new data back to file system.
		config.utils.writeLog( 'active', JSON.stringify( log ) );

		// Log out updated properties.
		config.debugger.log( `Successfully updated the following properties: ${ Object.keys( ARGS ).filter( key => key !== '_' ).join( '; ' ) }` );

		resolve( goal );
	} );
}
