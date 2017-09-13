// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );

// Vendor
const Promise = require( 'bluebird' );

// Project
const utils = require( '../utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var keyBlacklist = [ '_' ];

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function update( ARGS ) {
	return new Promise( ( resolve, reject ) => {
		var identifier = ARGS._[ 1 ] || null;

		if ( !identifier ) {
			console.log( 'Whoops, `update` must be invoked with a valid `identifier` argument.' );
			reject( null );
		}

		/// TODO[@jmykolyn]: Handle error.
		var log = JSON.parse( utils.getTodayLog() );
		var { goals } = log;
		var goal = goals[ identifier ] || null;

		if ( !goal ) {
			console.log( 'FAILED' ); /// TODO
			console.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
		}

		// Update selected `goal`.
		for ( let key in ARGS ) {
			if ( goal[ key ] !== 'undefined' && !keyBlacklist.includes( key ) ) {
				goal[ key ] = ARGS[ key ];
			}
		}

		// Write new data back to file system.
		fs.writeFileSync( utils.getTodayLogPath(), JSON.stringify( log ), 'utf8' );

		resolve( log );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = update;
