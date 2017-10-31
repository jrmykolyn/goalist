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
		let title = ARGS._[ 1 ] || null;

		if ( !title ) {
			console.log( 'Whoops, `add` must be invoked with a valid `title` argument.' );
			reject( null );
			return;
		}

		let log = utils.readTodayLog();
		let { goals } = log;

		// Create and update `goal`.
		let goal = {};

		goal.title = ARGS._[ 1 ];
		goal.status = 'incomplete';
		goal.description = ARGS.description || '';

		// Add `goal`.
		let id = new Date().getTime();

		goals[ id ] = goal;

		// Write new data back to file system.
		utils.writeLog( 'today', JSON.stringify( log ) );

		console.log( `Successfully created goal: ${id}` );

		resolve( log );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = add;
