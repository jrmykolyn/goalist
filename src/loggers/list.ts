import chalk from 'chalk';
import { Goal } from '../interfaces';

export default function list(goals: Goal[], goalist) {
	goals.forEach( ( goal ) => {
		Object.keys( goal ).forEach( ( key ) => {
			if ( goal.hasOwnProperty( key ) ) {
				goalist.config.debugger.log( `${chalk.gray( key + ':' )} ${goal[ key ]}` );
			}
		} );
			goalist.config.debugger.log( '\r' );
	} );
}
