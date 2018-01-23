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
import {
	DebuggerInstance,
	GoalistArgs,
	GoalistConfig,
	GoalistInput,
	GoalistOptions,
	UtilsInstance
} from './interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Goalist {
	config: GoalistConfig;

	constructor( options: GoalistOptions = {} ) {
		options = ( options && typeof options === 'object' ) ? options : {};

		this.config = {
			cli: !!options.cli,
			debugger:  new Debugger( options.debuggerOpts ),
			utils: new Utils( options.utilsOpts ),
		};
	}

	run( COMMAND: string = '', INPUT: GoalistInput = [], ARGS: GoalistArgs = {} ) {
		return new Promise( ( resolve, reject ) => {
			// Ensure that `gl` is invoked with a command.
			if ( !COMMAND || typeof COMMAND !== 'string' ) {
				this.config.debugger.log( 'Whoops, `goalist` must be executed with a valid command.' );
				reject( null );
				return;
			}

			// Ensure format/type of input.
			INPUT = ( Array.isArray( INPUT ) && INPUT.length ) ? INPUT : typeof INPUT === 'string' ? [ INPUT ] : [];

			// Ensure format/type of args.
			ARGS = ( ARGS && typeof ARGS === 'object' ) ? ARGS : {};

			/// TODO: Consider building out wrapper function around `getOrCreate*()` methods.
			let goalistDirData = this.config.utils.getOrCreateGoalistDir();
			let logsDirData = this.config.utils.getOrCreateLogsDir();
			let bakDirData = this.config.utils.getOrCreateBakDir();
			let activeLogData = this.config.utils.getOrCreateLog( 'active' );
			let archiveLogData = this.config.utils.getOrCreateLog( 'archive' );

			if ( COMMAND in commands ) {
				commands[ COMMAND ]( INPUT, ARGS, this.config ).then( resolve, reject );
			} else {
				this.config.debugger.log( 'Whoops, `goalist` was invoked with an invalid command.' );
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
