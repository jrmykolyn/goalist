// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );

// Vendor
const Promise = require( 'bluebird' );

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const keyBlacklist = [ '_' ];

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function update( ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		let identifier = ARGS._[ 1 ] || null;

		if ( !identifier ) {
			console.log( 'Whoops, `update` must be invoked with a valid `identifier` argument.' );
			reject( null );
			return;
		}

		let log = utils.readTodayLog();
		let { goals } = log;
		let goal = goals[ identifier ] || null;

		if ( !goal ) {
			console.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
			return;
		}

		// Update selected `goal`.
		for ( let key in ARGS ) {
			if ( goal[ key ] !== 'undefined' && !keyBlacklist.includes( key ) ) {
				goal[ key ] = ARGS[ key ];
			}
		}

		// Write new data back to file system.
		utils.writeLog( 'today', JSON.stringify( log ) );

		resolve( log );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = update;