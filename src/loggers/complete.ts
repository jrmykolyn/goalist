import { Goal } from '../interfaces';

export default function complete(goal: Goal, goalist) {
	if ( goal.complete === true ) goalist.config.debugger.log( `Setting the following task to complete: ${goal.id}` );
	if ( goal.complete === false ) goalist.config.debugger.log( `Setting the following task to incomplete: ${goal.id}` );
}
