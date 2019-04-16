// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendors

// Project
import { GoalistLog, GoalistArgs, GoalistConfig, GoalistInput } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function backup( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): Promise<GoalistLog> {
	return new Promise( ( resolve, reject ) => {
		let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );

		try {
			fs.writeFileSync( `${config.utils.getBakPath()}/goalist_${ARGS.archive ? 'archive' : 'active'}_${new Date().getTime()}.bak`, JSON.stringify( log ), 'utf8' );
			config.debugger.log( `Successfully backed up log: ${ARGS.archive ? 'archive' : 'active'}` );
			resolve( log );
			return;
		} catch ( err ) {
			config.debugger.log( `Failed to back up log: ${ARGS.archive ? 'archive' : 'active'}` );
			reject( err );
			return;
		}

	} );
}
