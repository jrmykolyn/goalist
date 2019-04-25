// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
import add from './add';
import archive from './archive';
import backup from './backup';
import complete from './complete';
import progress from './progress';
import remove from './remove';
import update from './update';

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
// NOTE: Each logger corresponds to a command, which may be invoked in either of the following ways:
// - By its full name (eg. `add`)
// - By an abbreviation (eg. `a`)
module.exports = {
	add,
	a: add,
	archive,
	ar: archive,
	backup,
	b: backup,
	complete,
	c: complete,
	progress,
	p: progress,
	remove,
	r: remove,
	update,
	u: update,
};
