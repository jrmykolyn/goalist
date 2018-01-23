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

export interface GoalistArgs {
	verbose?: boolean,
};
