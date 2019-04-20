// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendor

// Project
import { GoalistLog, GoalistArgs, GoalistConfig, GoalistInput } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function remove( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): Promise<GoalistLog> {
	return new Promise( ( resolve, reject ) => {
		let identifier = INPUT[ 0 ] || null;

		if ( !identifier ) {
			let err = 'Whoops, `remove` must be invoked with a valid `identifier` argument.';

			config.debugger.log( err );
			reject( new Error( err ) );
			return;
		}

		let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
		let { goals } = log;
		let goal = goals[ identifier ] || null;
		let userConf = null;

		if ( !goal ) {
			let err = `Whoops, failed to find a goal which matches the following identifier: ${identifier}`;

			config.debugger.log( err );
			reject( new Error( err ) );
			return;
		}

		// Proceed if:
		// - we're not running in CLI mode;
		// - or the `--force` flag was provided.
		if ( !config.cli || ARGS.force ) {
			config.debugger.log( `Removing task: ${identifier}` );

			for ( let key in goals ) {
				if ( goals[ key ] === goal ) {
					delete goals[ key ];
				}
			}

			// Write new data back to file system.
			config.utils.writeLog( ARGS.archive ? 'archive' : 'active', JSON.stringify( log ) );

			resolve( log );
			return;
		} else {
			config.debugger.log( 'This is a destructive action and can only be executed if the `--force` flag is provided. Aborting.' );
			reject( log );
			return;
		}
	} );
}
