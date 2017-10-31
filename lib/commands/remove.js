// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const readline = require( 'readline' );

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
function remove( ARGS ) {
	return new Promise( ( resolve, reject ) => {
		let identifier = ARGS._[ 1 ] || null;

		if ( !identifier ) {
			console.log( 'Whoops, `remove` must be invoked with a valid `identifier` argument.' );
			reject( null );
			return;
		}

		let log = utils.readTodayLog();
		let { goals } = log;
		let goal = goals[ identifier ] || null;
		let userConf = null;

		if ( !goal ) {
			console.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
			return;
		}

		const rl = readline.createInterface( {
		  input: process.stdin,
		  output: process.stdout
		} );

		/// TODO[@jrmykolyn]: Convert nested callback to Promise chain if possible.
		rl.question( 'Please note, this is a destructive action! Do you wish to continue? (y/n)\r', ( response ) => {
			if ( response.toString().toLowerCase() === 'y' ) {
				console.log( `Removing task: ${identifier}` );

				for ( let key in goals ) {
					if ( goals[ key ] === goal ) {
						delete goals[ key ];
					}
				}

				// Write new data back to file system.
				utils.writeLog( 'today', JSON.stringify( log ) );

				resolve( log );
			} else {
				console.log( `Aborting.` );

				reject( log ); /// TEMP
			}

			rl.close();
			return;
		} );
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = remove;
