// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
import makeCommand from './utils';
import { Goal, GoalistArgs, GoalistConfig, GoalistInput } from '../interfaces';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function list( INPUT: GoalistInput, ARGS: GoalistArgs, config: GoalistConfig ): Goal[] {
	const CATEGORY = ARGS.category ? ARGS.category.toLowerCase() : null;
	const TAGS = ARGS.tags ? ARGS.tags.split( ',' ).map( ( str ) => str.trim().toLowerCase() ) : [];

	let log = ARGS.archive ? config.utils.getLog( 'archive' ) : config.utils.getLog( 'active' );
	let { goals } = log;

	let whitelistProps = [ 'id', 'title' ]; // Props. to always display.
	let supplementaryProps = !ARGS.all && ARGS.show ? ARGS.show.split( ',' ).filter( ( prop ) => whitelistProps.indexOf( prop ) === -1 ) : []; // Set 'supplementary' if possible.

	const allGoals = Object.keys( goals ).map( ( key ) => goals[ key ] );
	const filteredGoals = ( ARGS.category || TAGS.length )
		? allGoals.filter( ( { category, tags } ) => {
			const sanitizedTags = tags && tags.length ? tags.map( ( tag ) => tag.toLowerCase() ) : [];
			return (
				( !!category && category.toLowerCase().includes( CATEGORY ) )
				|| ( !!sanitizedTags.length && sanitizedTags.some( ( tag ) => TAGS.includes( tag ) ) )
			);
		} )
		: allGoals;

	filteredGoals.forEach( ( goal ) => {
		// Update `supplementaryProps` for current `goal`.
		/// NOTE: Since not all `goal` objects are exactly the same, `supplementaryProps` must be updated within each loop iteration.
		/// TODO[@jrmykolyn]: Normalize shape of `goal`.
		if ( ARGS.all ) {
			supplementaryProps = Object.keys( goal ).filter( ( prop ) => whitelistProps.indexOf( prop ) === -1 );
		}

		const finalProps = whitelistProps.concat( supplementaryProps );

		Object.keys( goal ).forEach( ( key ) => {
			if ( !finalProps.includes( key ) ) delete goal[ key ];
		} );
	} );

	return filteredGoals;
}

export default makeCommand( list, [ () => Promise.resolve() ] );
