// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const Promise = require( 'bluebird' );

// Project
const utils = require( '../utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function list( ARGS ) {
	return new Promise( ( resolve, reject ) => {
		/// TODO[@jmykolyn]: Handle error.
		var log = JSON.parse( utils.getTodayLog() );
		var { goals } = log;

		// Print out info for each `goal` in current log.
		for ( let key in goals ) {
			let goal = goals[ key ];
			let { title, status, description } = goal;

			console.log( `Identifier: ${key}` );
			console.log( `Title: ${title}` );
			console.log( `Status: ${status}` );
			console.log( `Description: ${description || 'n/a'}` );
			console.log( "\n" );
		}

		resolve( log );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = list;
