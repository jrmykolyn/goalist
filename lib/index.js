// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
const add = require( './add' );
const complete = require( './complete' );
const list = require( './list' );
const progress = require( './progress' );
const remove = require( './remove' );
const update = require( './update' );
const version = require( './version' );

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
// NOTE: Each subcommand is exposed (and can therefore be invoked) in two ways:
// - By its full name (eg. `add`)
// - By an abbreviation (eg. `a`)
module.exports = {
	add,
	a: add,
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
