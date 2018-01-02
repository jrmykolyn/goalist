// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
import add from './add';
import archive from './archive';
import complete from './complete';
import list from './list';
import progress from './progress';
import remove from './remove';
import update from './update';
import version from './version';

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
// NOTE: Each subcommand is exposed (and can therefore be invoked) in two ways:
// - By its full name (eg. `add`)
// - By an abbreviation (eg. `a`)
module.exports = {
	add,
	a: add,
	archive,
	ar: archive,
	complete,
	c: complete,
	list,
	l: list,
	progress,
	p: progress,
	remove,
	r: remove,
	update,
	u: update,
	version,
	v: version
};
