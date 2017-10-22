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
		var log = utils.getTodayLog();
		var { goals } = log;
		var goal = goals[ identifier ] || null;

		/// TODO[@jrmykolyn]: Consolidate with identical logic in other subcommands.
		if ( !goal ) {
			console.log( 'Whoops, failed to find a goal which matches the following identifier:', identifier );
			reject( null );
			return;
		}

		if ( typeof goal.status === 'string' && goal.status.toLowerCase() === 'complete' ) {
			console.log( `The following task is already 'complete': ${identifier}` );
		} else {
			console.log( `Setting the following tast to 'complete': ${identifier}` );
			goal.status = 'Complete';
			utils.writeLog( 'today', JSON.stringify( log ) );
		}

		resolve( log );
		return;
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = complete;
