// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';
import * as readline from 'readline';

// Vendor

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function remove( INPUT, ARGS, config ) {
	return new Promise( ( resolve, reject ) => {
		let identifier = INPUT[ 0 ] || null;

		if ( !identifier ) {
			config.debugger.log( 'Whoops, `remove` must be invoked with a valid `identifier` argument.' );
			reject( null );
			return;
		}

		let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
		let { goals } = log;
		let goal = goals[ identifier ] || null;
		let userConf = null;

		if ( !goal ) {
			config.debugger.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
			return;
		}

		const rl = readline.createInterface( {
			input: process.stdin,
			output: process.stdout,
		} );

		/// TODO[@jrmykolyn]: Convert nested callback to Promise chain if possible.
		if ( config.cli ) {
			rl.question( 'Please note, this is a destructive action! Do you wish to continue? (y/n)\n', ( response ) => {
				if ( response.toString().toLowerCase() === 'y' ) {
					config.debugger.log( `Removing task: ${identifier}` );

					for ( let key in goals ) {
						if ( goals[ key ] === goal ) {
							delete goals[ key ];
						}
					}

					// Write new data back to file system.
					config.utils.writeLog( ARGS.archive ? 'archive' : 'active', JSON.stringify( log ) );

					resolve( log );
				} else {
					config.debugger.log( 'Aborting.' );
					reject( log );
				}

				rl.close();
				return;
			} );
		} else {
			config.debugger.log( `Removing task: ${identifier}` );

			for ( let key in goals ) {
				if ( goals[ key ] === goal ) {
					delete goals[ key ];
				}
			}

			// Write new data back to file system.
			config.utils.writeLog( ARGS.archive ? 'archive' : 'active', JSON.stringify( log ) );

			resolve( log );
		}
	} );
}
