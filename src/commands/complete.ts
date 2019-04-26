
// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor

// Project
import makeCommand from './utils';
import { Goal, GoalistArgs, GoalistConfig, GoalistInput } from '../interfaces';
import { hasValidInput } from '../validators';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function complete( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): Goal {
	let identifier = INPUT[ 0 ] || null;

	/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
	let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
	let { goals } = log;
	let goal = goals[ identifier ] || null;

	/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
	if ( !goal ) {
		let err = `Whoops, failed to find a goal which matches the following identifier: ${identifier}`;

		config.debugger.log( err );
		throw new Error( err );
	}

	// If invoked with the `--false` flag, set matched goal to incomplete.
	// Otherwise, set to complete.
	goal.complete = ARGS.false ? false : true;

	// Write new data back to file system.
	config.utils.writeLog( ARGS.archive ? 'archive' : 'active', JSON.stringify( log ) );

	return goal;
}

export default makeCommand( complete, [ hasValidInput( { msg: 'Whoops, `complete` must be invoked with a valid `identifier` argument.' } ) ] );
