// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
import { DebuggerInstance, UtilsInstance } from './';

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

export interface GoalistInput {
	[ index: number ]: string,
};

export interface GoalistProgress {
	type: string;
	total: number;
	complete: number;
	incomplete: number;
};

export interface GoalistArgs {
	active?: boolean;
	all?: boolean;
	archive?: boolean;
	category?: string;
	description?: string;
	false?: boolean;
	force?: boolean;
	show?: string;
	verbose?: boolean;
};
