// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
import * as barHorizontal from 'bar-horizontal';

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function progress( INPUT, ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		let log = utils.getLog( 'active' );
		let { goals } = log;

		let totalGoals = Object.keys( goals ).length;
		let numComplete = utils.getComplete( goals ).length;
		let numIncomplete = totalGoals - numComplete;

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
