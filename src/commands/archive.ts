// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function archive( INPUT, ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		let identifier = INPUT[ 0 ] || null;

		/// TODO[@jrmykolyn]: Consolidate with *almost* identical logic in other subcommands.
		if ( !identifier ) {
			console.log( 'Whoops, subcommand must be invoked with a valid `identifier` argument.' );
			reject( null );
			return;
		}

		// Read in 'source' and 'target' data based on presence of '--active' flag.
		// - If flag is present, 'archived data' is being activated.
		// - Otherwise, 'active data' is being archived.
		let isActive = !ARGS.active;
		let sourceData = isActive ? utils.getLog( 'active' ) : utils.getLog( 'archive' );
		let targetData = isActive ? utils.getLog( 'archive' ) : utils.getLog( 'active' );

		// Destructure 'source' data, extract target goal.
		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		let { goals } = sourceData;
		let goal = goals[ identifier ] || null;

		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		if ( !goal ) {
			console.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
			return;
		}

		// Update `active` key.
		if ( isActive ) {
			console.log( `Deactivating the following task: ${identifier}` );
			goal.active = false;
		} else {
			console.log( `Activating the following task: ${identifier}` );
			goal.active = true;
		}

		// Remove target goal; update 'source' and 'target' data.
		delete goals[ identifier ];
		sourceData.goals = goals;
		targetData.goals = Object.assign( targetData.goals, { [ identifier ]: goal } );

		// Write 'active' and 'archive' data back to disk.
		utils.writeLog( 'active', JSON.stringify( isActive ? sourceData : targetData ) );
		utils.writeLog( 'archive', JSON.stringify( isActive ? targetData : sourceData ) );

		resolve( targetData );
		return;
	} );
}
