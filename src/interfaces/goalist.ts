// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
import { Goal, DebuggerInstance, UtilsInstance } from './';

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
export interface GoalistOptions {
	cli?: boolean,
	debuggerOpts?: any,
	utilsOpts?: any,
};

export interface GoalistConfig {
	cli: boolean,
	debugger: DebuggerInstance,
	utils: UtilsInstance,
};

export type GoalistInput = string[];

export interface GoalistProgress {
	type: string;
	total: number;
	complete: number;
	incomplete: number;
};

export interface GoalistLog {
	goals: { [key: string]: Goal },
};

export interface GoalistArgs {
	active?: boolean;
	all?: boolean;
	archive?: boolean;
	category?: string;
	description?: string;
	tags?: string;
	false?: boolean;
	force?: boolean;
	show?: string;
	verbose?: boolean;
};

export interface CommandPayload<T> {
	msg: string;
	payload: T;
};
