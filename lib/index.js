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
module.exports = {
	add,
	complete,
	list,
	progress,
	remove,
	update,
	version,
};
