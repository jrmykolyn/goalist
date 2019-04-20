// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendors

// Project
import makeCommand from './utils';
import { Goal, GoalistArgs, GoalistConfig, GoalistInput } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function add( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): Goal {
	let title = INPUT[ 0 ] || null;

	let log = config.utils.getLog( 'active' );
	let { goals } = log;

	// Create and update `goal`.
	let id = config.utils.generateId();
	let goal: Goal = {
		id: id,
		title: title,
		category: ARGS.category || '',
		description: ARGS.description || '',
		tags: ARGS.tags ? ARGS.tags.split( ',' ).map((str) => str.trim()) : [],
		complete: false,
		active: true,
	};

	// Add `goal`.
	goals[ id ] = goal;

	// Write new data back to file system.
	config.utils.writeLog( 'active', JSON.stringify( log ) );

	config.debugger.log( `Successfully created goal: ${id}` );

	return goal;
}

const hasValidTitle = ( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ) => {
	return new Promise( ( resolve, reject ) => {
		const [title] = INPUT;

		if ( !title ) {
			reject( new Error( 'Whoops, `add` must be invoked with a valid `title` argument.' ) );
		} else {
			resolve();
		}
	} );
};


export default makeCommand( add, [ hasValidTitle ] );
