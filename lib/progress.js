// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const Promise = require( 'bluebird' );
const barHorizontal = require( 'bar-horizontal' );

// Project
const utils = require( '../utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function progress() {
	return new Promise( ( resolve, reject ) => {
		var log = utils.readTodayLog();
		var { goals } = log;

		/// TODO[@jrmykolyn]: Consider pulling 'get incomplete'/'get complete' logic into dedicated `utils` methods.
		var totalGoals = Object.keys( goals ).length;
		var numComplete = Object.keys( goals ).filter( id => goals[ id ].status !== 'incomplete' ).length;
		var numIncomplete = totalGoals - numComplete;

		console.log( `OVERVIEW`);
		console.log( `Total: ${totalGoals}\r` );
		console.log( `Complete: ${numComplete}\r` );
		console.log( `Incomplete: ${numIncomplete}\n` );

		barHorizontal( {
			'Complete': numComplete,
			'Incomplete': numIncomplete,
		}, { labels: true } );

		resolve( log );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = progress;
