// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
import * as barHorizontal from 'bar-horizontal';

// Project
import { Goal, GoalistArgs, GoalistConfig, GoalistInput, GoalistProgress } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export default function progress( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): Promise<GoalistProgress> {
	return new Promise( ( resolve, reject ) => {
		let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
		let { goals } = log;

		let total = Object.keys( goals ).length;
		let complete = config.utils.getComplete( goals ).length;
		let incomplete = total - complete;

		resolve( {
			type: ARGS.archive ? 'archive' : 'active',
			total,
			complete,
			incomplete,
		} );
	} );
}
