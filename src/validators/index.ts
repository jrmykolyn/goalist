// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
import { GoalistInput, GoalistArgs, GoalistConfig } from '../interfaces';

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export const hasValidTitle = ( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ) => {
	const [title] = INPUT;

	if ( !title ) throw new Error( 'Whoops, `add` must be invoked with a valid `title` argument.' );
};
