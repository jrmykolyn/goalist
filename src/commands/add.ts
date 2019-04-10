// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendors

// Project
import { Goal } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function add( INPUT, ARGS, config ) {
	return new Promise( ( resolve, reject ) => {
		let title = INPUT[ 0 ] || null;

		if ( !title ) {
			let err = 'Whoops, `add` must be invoked with a valid `title` argument.';

			config.debugger.log( err );
			reject( new Error( err ) );
			return;
		}

		let log = config.utils.getLog( 'active' );
		let { goals } = log;

		// Create and update `goal`.
		let id = config.utils.generateId();
		let goal: Goal = {
			id: id,
			title: title,
			description: ARGS.description || '',
			complete: false,
			active: true,
		};

		// Add `goal`.
		goals[ id ] = goal;

		// Write new data back to file system.
		config.utils.writeLog( 'active', JSON.stringify( log ) );

		config.debugger.log( `Successfully created goal: ${id}` );

		resolve( goal );
	} );
}
