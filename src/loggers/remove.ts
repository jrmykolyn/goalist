import { Goal } from '../interfaces';

export default function remove(goal: Goal, goalist) {
	goalist.config.debugger.log( `Removed goal: ${goal.id}` );
}
