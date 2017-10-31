// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const pkgDir = require( 'pkg-dir' );

// Project
const commands = require( './commands' );
const utils = require( `${pkgDir.sync( __dirname )}/utils` );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function preflight( arr ) {
	let [ COMMAND, ARGS ] = arr;

	return new Promise( ( resolve, reject ) => {
		// Ensure that `gl` is invoked with at least 1x arg.
		if ( !ARGS._[ 0 ] ) {
			console.log( 'Whoops, `goalist` must be executed with a valid command.' );
			reject( null );
			return;
		}

		/// TODO: Consider building out wrapper function around `getOrCreate*()` methods.
		let goalistDirData = utils.getOrCreateGoalistDir();
		let logsDirData = utils.getOrCreateLogsDir();
		let todayLogData = utils.getOrCreateTodayLog();

		// Validate `COMMAND`, log error message otherwise.
		 if ( COMMAND in commands ) {
			 resolve( [ COMMAND, ARGS ] );
			 return;
		} else {
			console.log( 'Whoops, `goalist` was invoked with an invalid command.' );
			reject( null );
			return;
		}
	} );
}

function run( arr ) {
	let [ COMMAND, ARGS ] = arr;

	return new Promise( ( resolve, reject ) => {
		if ( COMMAND in commands ) {
			commands[ COMMAND ]( ARGS ).then( resolve );
		} else {
			reject( null );
		}
	} );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
	preflight,
	run,
	commands,
};
