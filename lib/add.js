// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );

// Vendor

// Project
const utils = require( '../utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function add( ARGS ) {
	return new Promise( ( resolve, reject ) => {
		/// TODO[@jmykolyn]: Handle error.
		var log = JSON.parse( utils.getTodayLog() );
		var { goals } = log;

		// Create and update `goal`.
		var goal = {};

		goal.title = ARGS._[ 1 ];
		goal.status = 'incomplete';
		goal.description = ARGS.description || '';

		// Add `goal`.
		var ts = new Date().getTime();

		goals[ ts ] = goal;

		// Write new data back to file system.
		fs.writeFileSync( utils.getTodayLogPath(), JSON.stringify( log ), 'utf8' );

		resolve( log );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = add;
