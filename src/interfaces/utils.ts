// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
export interface UtilsInstance {
	barHorizontal: any;
	goalistDirName: any;
	goalistDirRoot: any;
	goalistDirPath: any;
	generateId: any;
	getBakPath: any;
	getComplete: any;
	getLog: any;
	getOrCreateGoalistDir: any;
	getOrCreateLogsDir: any;
	getOrCreateBakDir: any;
	getOrCreateLog: any;
	writeLog: any;
};

export interface UtilsStore {
	ref: UtilsInstance|null
};
