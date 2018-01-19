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
import { GoalistInput, GoalistArgs } from './interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Goalist {
	run( COMMAND: string = '', INPUT: GoalistInput = [], ARGS: GoalistArgs = {} ) {
		// Allow dependent script to configure `Utils` at instantion.
		let utils = new Utils( ARGS.utilsOpts );

		return new Promise( ( resolve, reject ) => {
			// Ensure that `gl` is invoked with a command.
			if ( !COMMAND || typeof COMMAND !== 'string' ) {
				console.log( 'Whoops, `goalist` must be executed with a valid command.' );
				reject( null );
				return;
			}

			// Ensure format/type of input.
			INPUT = ( Array.isArray( INPUT ) && INPUT.length ) ? INPUT : typeof INPUT === 'string' ? [ INPUT ] : [];

			// Ensure format/type of args.
			ARGS = ( ARGS && typeof ARGS === 'object' ) ? ARGS : {};

			// Set Debugger mode based on args.
			Debugger.verbose( !!ARGS.verbose );

			/// TODO: Consider building out wrapper function around `getOrCreate*()` methods.
			let goalistDirData = utils.getOrCreateGoalistDir();
			let logsDirData = utils.getOrCreateLogsDir();
			let bakDirData = utils.getOrCreateBakDir();
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
