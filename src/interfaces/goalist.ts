// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
import { UtilsInstance } from './';

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
export interface GoalistInstance {
	utilsRef: UtilsInstance,
};

export interface GoalistOptions {
	utilsOpts?: any,
};

export interface GoalistInput {
	[ index: number ]: string,
};

export interface GoalistArgs {
	verbose?: boolean,
};
