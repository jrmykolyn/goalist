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

test.todo( 'Test `getTodayLogName()`' );

test.todo( 'Test `getTodayLogPath()`' );

test.todo( 'Test `getTodayLog()`' );

test.todo( 'Test `writeLog()`' );

test( 'Test `getLogName()`', ( t ) => {
	/// TODO
	let logName1 = utils.getLogName( '2001-01-01' );
	let logName2 = utils.getLogName( [] );
	let logName3 = utils.getLogName( {} );
	let logName4 = utils.getLogName( 1 );
	let logName5 = utils.getLogName( false );

	t.is( logName1, 'goalist_2001-01-01.log' );
	t.is( logName2, null );
	t.is( logName3, null );
	t.is( logName4, null );
	t.is( logName5, null );
} );
