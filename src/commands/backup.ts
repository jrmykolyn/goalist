// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendors

// Project
import makeCommand from './utils';
import { CommandPayload, GoalistLog, GoalistArgs, GoalistConfig, GoalistInput } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function backup( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): CommandPayload<GoalistLog> {
	let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );

	try {
		fs.writeFileSync( `${config.utils.getBakPath()}/goalist_${ARGS.archive ? 'archive' : 'active'}_${new Date().getTime()}.bak`, JSON.stringify( log ), 'utf8' );

		return {
			msg: `Successfully backed up log: ${ARGS.archive ? 'archive' : 'active'}`,
			payload: log,
		};
	} catch ( err ) {
		throw new Error( `Failed to back up log: ${ARGS.archive ? 'archive' : 'active'}` );
	}
}

export default makeCommand( backup, [ () => Promise.resolve() ] );

