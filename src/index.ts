// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
import * as pkgDir from 'pkg-dir';

// Project
import * as commands from './commands';
import Utils from './utils';
import Debugger from './debugger';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const utils = new Utils();


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Goalist {
	run( COMMAND, INPUT, ARGS ) {
		return new Promise( ( resolve, reject ) => {
			// Ensure that `gl` is invoked with a command.
			if ( !COMMAND ) {
				console.log( 'Whoops, `goalist` must be executed with a valid command.' );
				reject( null );
				return;
			}

			// Set Debugger mode based on args.
			Debugger.verbose( !!ARGS.verbose );

			/// TODO: Consider building out wrapper function around `getOrCreate*()` methods.
			let goalistDirData = utils.getOrCreateGoalistDir();
			let logsDirData = utils.getOrCreateLogsDir();
			let activeLogData = utils.getOrCreateLog( 'active' );
			let archiveLogData = utils.getOrCreateLog( 'archive' );

			if ( COMMAND in commands ) {
				commands[ COMMAND ]( INPUT, ARGS, utils ).then( resolve, reject );
			} else {
				console.log( 'Whoops, `goalist` was invoked with an invalid command.' );
				reject( null );
				return;
			}
		} );
	}
}


// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Goalist;
