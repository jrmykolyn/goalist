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
export default function complete( INPUT, ARGS, utils, d ) {
	return new Promise( ( resolve, reject ) => {
		let identifier = INPUT[ 0 ] || null;

		/// TODO[@jrmykolyn]: Consolidate with *almost* identical logic in other subcommands.
		if ( !identifier ) {
			d.log( 'Whoops, subcommand must be invoked with a valid `identifier` argument.' );
			reject( null );
			return;
		}

		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		let log = utils.getLog( 'active' );
		let { goals } = log;
		let goal = goals[ identifier ] || null;

		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		if ( !goal ) {
			d.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
			return;
		}

		// If invoked with the `--false` flag, set matched goal to incomplete.
		// Otherwise, set to complete.
		if ( ARGS.false ) {
			d.log( `Setting the following task to incomplete: ${identifier}` );
			goal.complete = false;
		} else {
			d.log( `Setting the following task to complete: ${identifier}` );
			goal.complete = true;
		}

		utils.writeLog( 'active', JSON.stringify( log ) );

		resolve( goal );
		return;
	} );
}
