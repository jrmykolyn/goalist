// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const os = require( 'os' );

// Vendor
const test = require( 'ava' );

// Project
const utils = require( '../lib/utils' );

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
test( 'Test `readGoalistDir()`', ( t ) => {
	let dir = utils.readGoalistDir();

	t.true( Array.isArray( dir ) );
} );

test( 'Test `getDirPath()`', ( t ) => {
	let dirPath = utils.getDirPath();

	t.is( dirPath, `${utils.getGoalistDirPath()}/logs` );
} );

test( 'Test `getTodayHandle()`', ( t ) => {
	let todayHandle = utils.getTodayHandle();

	let today = new Date();
	let y = today.getFullYear();
	let m = ( today.getMonth() + 1 );
	let d = today.getDate();

	if ( m < 10 ) { m = ( '0' + m ).slice( 0, 2 ); }

	t.is( todayHandle, `${y}-${m}-${d}`);
} );

test( 'Test `getTodayLogName()`', ( t ) => {
	let todayLogName = utils.getTodayLogName();

	t.is( todayLogName, `goalist_${utils.getTodayHandle()}.log` );
} );

test( 'Test `getTodayLogPath()`', ( t ) => {
	let todayLogPath = utils.getTodayLogPath();

	t.is( todayLogPath, `${utils.getDirPath()}/${utils.getTodayLogName()}` );
} );

test.todo( 'Test `readTodayLog()`' );

test.todo( 'Test `getLatestLogName()`' );

test.todo( 'Test `getLatestLogPath()`' );

test.todo( 'Test `readLatestLog()`' );

test( 'Test `getLogName()`', ( t ) => {
	/// TODO: Refactor creation/testing of `getLogName()` invocations.
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

test.todo( 'Test `getLogPath()`' );

test.todo( 'Test `getLog()`' );

test.todo( 'Test `getLogNames()`' );

test.todo( 'Test `readLog()`' );

test.todo( 'Test `writeLog()`' );

test.todo( 'Test `getLogTemplate()`' );

test.todo( 'Test `getOrCreateGoalistDir()`' );

test.todo( 'Test `getOrCreateLogsDir()`' );

test.todo( 'Test `getOrCreateTodayLog()`' );
