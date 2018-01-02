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
export default function progress( ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		let log = utils.getLog( 'active' );
		let { goals } = log;

		/// TODO[@jrmykolyn]: Consider pulling 'get incomplete'/'get complete' logic into dedicated `utils` methods.
		let totalGoals = Object.keys( goals ).length;
		let numComplete = Object.keys( goals ).filter( id => goals[ id ].status !== 'incomplete' ).length;
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
