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
export default function backup( INPUT, ARGS, utils ) {
	return new Promise( ( resolve, reject ) => {
		let log = ARGS.archive ? utils.getLog( 'archive' ) : utils.getLog( 'active' );

		try {
			fs.writeFileSync( `${utils.getBakPath()}/goalist_${ARGS.archive ? 'archive' : 'active'}_${new Date().getTime()}.bak`, JSON.stringify( log ), 'utf8' );
			console.log( `Successfully backed up log: ${ARGS.archive ? 'archive' : 'active'}` );
			resolve( log );
			return;
		} catch ( err ) {
			console.log( `Failed to back up log: ${ARGS.archive ? 'archive' : 'active'}` );
			reject( err );
			return;
		}

	} );
}
