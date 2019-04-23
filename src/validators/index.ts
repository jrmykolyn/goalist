// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
import { GoalistInput, GoalistArgs, GoalistConfig } from '../interfaces';

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
export const hasValidInput = ( { msg = '' } = {} ) => {
	return ( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ) => {
		const [input] = INPUT;

		if ( !input ) throw new Error( msg || 'Whoops, something went wrong!' );
	};
};
