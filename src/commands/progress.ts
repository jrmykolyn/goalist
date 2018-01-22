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
export default function progress( INPUT, ARGS, utils, d ) {
	return new Promise( ( resolve, reject ) => {
		let log = utils.getLog( 'active' );
		let { goals } = log;

		let totalGoals = Object.keys( goals ).length;
		let numComplete = utils.getComplete( goals ).length;
		let numIncomplete = totalGoals - numComplete;

		d.log( 'OVERVIEW' );
		d.log( `Total: ${totalGoals}\r` );
		d.log( `Complete: ${numComplete}\r` );
		d.log( `Incomplete: ${numIncomplete}\n` );

		barHorizontal( {
			'Complete': numComplete,
			'Incomplete': numIncomplete,
		}, { labels: true } );

		resolve( log );
	} );
}
