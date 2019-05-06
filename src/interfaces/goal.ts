// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
export interface Goal {
	id: number;
	title: string;
	category: string;
	description: string;
	tags: string[];
	complete: boolean;
	active: boolean;
	createdAt: number;
	updatedAt: number;
};
