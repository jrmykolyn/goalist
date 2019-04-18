// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

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
function archive( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): Promise<GoalistLog> {
	let identifier = INPUT[ 0 ] || null;

	// Read in 'source' and 'target' data based on presence of '--active' flag.
	// - If flag is present, 'archived data' is being activated.
	// - Otherwise, 'active data' is being archived.
	let isActive = !ARGS.active;
	let sourceData = isActive ? config.utils.getLog( 'active' ) : config.utils.getLog( 'archive' );
	let targetData = isActive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );

	// Destructure 'source' data, extract target goal.
	/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
	let { goals } = sourceData;
	let goal = goals[ identifier ] || null;

	/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
	if ( !goal ) {
		let err = `Whoops, failed to find a goal which matches the following identifier: ${identifier}`;

		config.debugger.log( err );
		throw new Error( err );
		return;
	}

	// Update `active` key.
	goal.active = isActive ? false : true;

	// Remove target goal; update 'source' and 'target' data.
	delete goals[ identifier ];
	sourceData.goals = goals;
	targetData.goals = Object.assign( targetData.goals, { [ identifier ]: goal } );

	// Write 'active' and 'archive' data back to disk.
	config.utils.writeLog( 'active', JSON.stringify( isActive ? sourceData : targetData ) );
	config.utils.writeLog( 'archive', JSON.stringify( isActive ? targetData : sourceData ) );

	return targetData;
}

export default makeCommand( archive, [ hasValidInput( { msg: 'Whoops, `archive` must be invoked with a valid `identifier` argument.' } ) ] );
