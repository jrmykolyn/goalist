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
export default function add( ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		let title = ARGS._[ 1 ] || null;

		if ( !title ) {
			console.log( 'Whoops, `add` must be invoked with a valid `title` argument.' );
			reject( null );
			return;
		}

		let log = utils.getLog( 'active' );
		let { goals } = log;

		// Create and update `goal`.
		let id = new Date().getTime();
		let goal: Goal = {
			id: id,
			title: ARGS._[ 1 ],
			description: ARGS.description || '',
			complete: false,
			active: true,
		};

		// Add `goal`.
		goals[ id ] = goal;

		// Write new data back to file system.
		utils.writeLog( 'active', JSON.stringify( log ) );

		console.log( `Successfully created goal: ${id}` );

		resolve( log );
	} );
}
