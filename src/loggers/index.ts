// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
import add from './add';
import archive from './archive';

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
};
