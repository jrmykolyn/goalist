// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
// Project
const utils = require( '../utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function complete( ARGS ) {
	return new Promise( ( resolve, reject ) => {
		var identifier = ARGS._[ 1 ] || null;

		/// TODO[@jrmykolyn]: Consolidate with *almost* identical logic in other subcommands.
		if ( !identifier ) {
			console.log( 'Whoops, subcommand must be invoked with a valid `identifier` argument.' );
			reject( null );
			return;
		}

		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		var log = utils.readTodayLog();
		var { goals } = log;
		var goal = goals[ identifier ] || null;

		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		if ( !goal ) {
			console.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
			return;
		}

		// If invoked with the `--false` flag, set matched goal status 'incomplete'.
		// Otherwise, set status to complete.
		if ( ARGS.false ) {
			console.log( `Setting the following tast to 'incomplete': ${identifier}` );
			goal.status = 'incomplete';
		} else {
			console.log( `Setting the following tast to 'complete': ${identifier}` );
			goal.status = 'complete';
		}

		utils.writeLog( 'today', JSON.stringify( log ) );

		resolve( log );
		return;
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = complete;
