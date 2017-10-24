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

test.todo( 'Test `getTodayDirName()`' );

test.todo( 'Test `getTodayDirPath()`' );

test.todo( 'Test `getTodayDir()`' );

test.todo( 'Test `getTodayLogName()`' );

test.todo( 'Test `getTodayLogPath()`' );

test.todo( 'Test `getTodayLog()`' );

test.todo( 'Test `getYesterdayDirName()`' );

test.todo( 'Test `getYesterdayDirPath()`' );

test.todo( 'Test `getYesterdayDir()`' );

test.todo( 'Test `getYesterdayLogName()`' );

test.todo( 'Test `getYesterdayLogPath()`' );

test.todo( 'Test `getYesterdayLog()`' );

test.todo( 'Test `writeLog()`' );
