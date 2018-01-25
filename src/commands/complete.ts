
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
export default function complete( INPUT, ARGS, config ) {
	return new Promise( ( resolve, reject ) => {
		let identifier = INPUT[ 0 ] || null;

		/// TODO[@jrmykolyn]: Consolidate with *almost* identical logic in other subcommands.
		if ( !identifier ) {
			let err = 'Whoops, subcommand must be invoked with a valid `identifier` argument.';

			config.debugger.log( err );
			reject( new Error( err ) );
			return;
		}

		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
		let { goals } = log;
		let goal = goals[ identifier ] || null;

		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		if ( !goal ) {
			let err = `Whoops, failed to find a goal which matches the following identifier: ${identifier}`;

			config.debugger.log( err );
			reject( new Error( err ) );
			return;
		}

		// If invoked with the `--false` flag, set matched goal to incomplete.
		// Otherwise, set to complete.
		if ( ARGS.false ) {
			config.debugger.log( `Setting the following task to incomplete: ${identifier}` );
			goal.complete = false;
		} else {
			config.debugger.log( `Setting the following task to complete: ${identifier}` );
			goal.complete = true;
		}

		// Write new data back to file system.
		config.utils.writeLog( ARGS.archive ? 'archive' : 'active', JSON.stringify( log ) );

		resolve( goal );
		return;
	} );
}
