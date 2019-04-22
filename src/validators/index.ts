// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
import { GoalistInput, GoalistArgs, GoalistConfig } from '../interfaces';

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export const hasValidTitle = ( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ) => {
	return new Promise( ( resolve, reject ) => {
		const [title] = INPUT;

		if ( !title ) {
			reject( new Error( 'Whoops, `add` must be invoked with a valid `title` argument.' ) );
		} else {
			resolve();
		}
	} );
};
