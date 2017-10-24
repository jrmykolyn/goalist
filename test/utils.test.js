// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const os = require( 'os' );

// Vendor
const test = require( 'ava' );

// Project
const utils = require( '../utils' );

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test( 'Test `getGoalistDirName()`', ( t ) => {
	let dirName = utils.getGoalistDirName();

	t.is( dirName, '.goalist' );
} );

test( 'Test `getGoalistDirPath()`', ( t ) => {
	let dirPath = utils.getGoalistDirPath();

	t.is( dirPath, `${os.homedir()}/.goalist` );
} );

/// TODO: Make more robust. Does this really tell us whether or not the method is working?
test( 'Test `getGoalistDir()`', ( t ) => {
	let dir = utils.getGoalistDir();

	t.true( Array.isArray( dir ) );
} );
