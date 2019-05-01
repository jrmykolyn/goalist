// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendor

// Project
import makeCommand from './utils';
import { CommandPayload, Goal, GoalistArgs, GoalistConfig, GoalistInput } from '../interfaces';
import { hasValidInput } from '../validators';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const keyBlacklist = [ '_' ];

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function update( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): CommandPayload<Goal> {
	let identifier = INPUT[ 0 ] || null;

	let log = config.utils.getLog( 'active' );
	let { goals } = log;
	let goal = goals[ identifier ] || null;

	if ( !goal ) {
		throw new Error( `Whoops, failed to find a goal which matches the following identifier: ${identifier}` );
	}

	// Update selected `goal`.
	for ( let key in ARGS ) {
		if ( goal[ key ] !== 'undefined' && keyBlacklist.indexOf( key ) === -1 ) {
			goal[ key ] = ARGS[ key ];
		}
	}

	goal.updatedAt = config.utils.getTimestamp();

	// Write new data back to file system.
	config.utils.writeLog( 'active', JSON.stringify( log ) );

	return {
		msg: `Successfully updated the following properties: ${ Object.keys( ARGS ).filter( key => key !== '_' ).join( '; ' ) }`,
		payload: goal,
	};
}

export default makeCommand( update, [ hasValidInput( { msg: 'Whoops, `update` must be invoked with a valid `identifier` argument.' } ) ] );
