// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
export interface Goal {
	id: number,
	title: string,
	category?: string,
	description?: string,
	complete: boolean,
	active: boolean,
};
