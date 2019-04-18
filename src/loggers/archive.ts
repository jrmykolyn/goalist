import { Goal } from '../interfaces';

export default function archive(goal: Goal, goalist) {
	if ( goal.active === true ) goalist.config.debugger.log( `Activated the following task: ${goal.id}` );
	if ( goal.active === false ) goalist.config.debugger.log( `Deactivated the following task: ${goal.id}` );
}
