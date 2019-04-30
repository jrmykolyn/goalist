// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
import * as barHorizontal from 'bar-horizontal';

// Project
import makeCommand from './utils';
import { Goal, GoalistArgs, GoalistConfig, GoalistInput, GoalistProgress } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function progress( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): GoalistProgress {
	let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
	let { goals } = log;

	let total = Object.keys( goals ).length;
	let complete = config.utils.getComplete( goals ).length;
	let incomplete = total - complete;

	return {
		type: ARGS.archive ? 'archive' : 'active',
		total,
		complete,
		incomplete,
	};
}

export default makeCommand( progress, [ () => Promise.resolve() ] );
