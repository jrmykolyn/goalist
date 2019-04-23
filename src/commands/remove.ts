// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendor

// Project
import makeCommand from './utils';
import { GoalistLog, GoalistArgs, GoalistConfig, GoalistInput } from '../interfaces';
import { hasValidInput } from '../validators';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function remove( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): Promise<GoalistLog> {
	let identifier = INPUT[ 0 ] || null;

	let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
	let { goals } = log;
	let goal = goals[ identifier ] || null;
	let userConf = null;

	if ( !goal ) {
		let err = `Whoops, failed to find a goal which matches the following identifier: ${identifier}`;

		config.debugger.log( err );
		throw new Error( err );
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

		return log;
	} else {
		config.debugger.log( 'This is a destructive action and can only be executed if the `--force` flag is provided. Aborting.' );
		return;
	}
}

export default makeCommand( remove, [ hasValidInput( { msg: 'Whoops, `remove` must be invoked with a valid `identifier` argument.' } ) ] );
