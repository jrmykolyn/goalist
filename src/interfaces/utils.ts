// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
export interface UtilsInstance {
	goalistDirName: any,
	goalistDirRoot: any,
	goalistDirPath: any,
	getOrCreateGoalistDir: any,
	getOrCreateLogsDir: any,
	getOrCreateBakDir: any,
	getOrCreateLog: any,
};

export interface UtilsStore {
	ref: UtilsInstance|null
};
