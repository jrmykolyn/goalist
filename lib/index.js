// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
const add = require( './add' );
const list = require( './list' );
const update = require( './update' );
const progress = require( './progress' );
const remove = require( './remove' );
const version = require( './version' );

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
	add,
	list,
	update,
	progress,
	remove,
	version,
};
