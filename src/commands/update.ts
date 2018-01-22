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
export default function update( INPUT, ARGS, utils, d ) {
	return new Promise( ( resolve, reject ) => {
		let identifier = INPUT[ 0 ] || null;

		if ( !identifier ) {
			d.log( 'Whoops, `update` must be invoked with a valid `identifier` argument.' );
			reject( null );
			return;
		}

		let log = utils.getLog( 'active' );
		let { goals } = log;
		let goal = goals[ identifier ] || null;

		if ( !goal ) {
			d.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
			return;
		}

		// Update selected `goal`.
		for ( let key in ARGS ) {
			if ( goal[ key ] !== 'undefined' && keyBlacklist.indexOf( key ) === -1 ) {
				goal[ key ] = ARGS[ key ];
			}
		}

		// Write new data back to file system.
		utils.writeLog( 'active', JSON.stringify( log ) );

		// Log out updated properties.
		d.log( `Successfully updated the following properties: ${ Object.keys( ARGS ).filter( key => key !== '_' ).join( '; ' ) }` );

		resolve( log );
	} );
}
