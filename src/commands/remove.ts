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
		throw new Error( `Whoops, failed to find a goal which matches the following identifier: ${identifier}` );
	}

	// Proceed if:
	// - we're not running in CLI mode;
	// - or the `--force` flag was provided.
	if ( !config.cli || ARGS.force ) {
		for ( let key in goals ) {
			if ( goals[ key ] === goal ) {
				delete goals[ key ];
			}
		}

		// Write new data back to file system.
		config.utils.writeLog( ARGS.archive ? 'archive' : 'active', JSON.stringify( log ) );

		return goal;
	} else {
		throw new Error( 'This is a destructive action and can only be executed if the `--force` flag is provided. Aborting.' );
	}
}

export default makeCommand( remove, [ hasValidInput( { msg: 'Whoops, `remove` must be invoked with a valid `identifier` argument.' } ) ] );
