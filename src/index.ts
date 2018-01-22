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
	GoalistInput,
	GoalistInstance,
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
	debuggerRef: DebuggerInstance;
	utilsRef: UtilsInstance;

	constructor( options: GoalistOptions = {} ) {
		options = ( options && typeof options === 'object' ) ? options : {};

		// Allow dependent script (eg. CLI) to specify Debugger mode at instantiation.
		this.debuggerRef = new Debugger( options.debuggerOpts );

		// Allow dependent script to configure `Utils` at instantiation.
		this.utilsRef = new Utils( options.utilsOpts );
	}

	run( COMMAND: string = '', INPUT: GoalistInput = [], ARGS: GoalistArgs = {} ) {
		return new Promise( ( resolve, reject ) => {
			// Ensure that `gl` is invoked with a command.
			if ( !COMMAND || typeof COMMAND !== 'string' ) {
				this.debuggerRef.log( 'Whoops, `goalist` must be executed with a valid command.' );
				reject( null );
				return;
			}

			// Ensure format/type of input.
			INPUT = ( Array.isArray( INPUT ) && INPUT.length ) ? INPUT : typeof INPUT === 'string' ? [ INPUT ] : [];

			// Ensure format/type of args.
			ARGS = ( ARGS && typeof ARGS === 'object' ) ? ARGS : {};

			/// TODO: Consider building out wrapper function around `getOrCreate*()` methods.
			let goalistDirData = this.utilsRef.getOrCreateGoalistDir();
			let logsDirData = this.utilsRef.getOrCreateLogsDir();
			let bakDirData = this.utilsRef.getOrCreateBakDir();
			let activeLogData = this.utilsRef.getOrCreateLog( 'active' );
			let archiveLogData = this.utilsRef.getOrCreateLog( 'archive' );

			if ( COMMAND in commands ) {
				commands[ COMMAND ]( INPUT, ARGS, this.utilsRef, this.debuggerRef ).then( resolve, reject );
			} else {
				this.debuggerRef.log( 'Whoops, `goalist` was invoked with an invalid command.' );
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
