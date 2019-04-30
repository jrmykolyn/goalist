import { Goal } from '../interfaces';

export default function add(goal: Goal, goalist) {
	goalist.config.debugger.log( `Successfully created goal: ${goal.id}` );
}
