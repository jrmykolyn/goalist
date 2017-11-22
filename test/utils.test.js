// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const os = require( 'os' );
const path = require( 'path' );

// Vendor
const test = require( 'ava' );
const del = require( 'del' );

// Project
import Utils from '../dist/utils';

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const setupOpts = {
	goalistDir: `${__dirname}/temp`,
	logsDirName: 'logs',
	logIdentifier: '1989-12-29',
	logName: 'goalist_1989-12-29.log',
	logData: { hello: 'world!' },
}

const utils = new Utils( {
	path: setupOpts.goalistDir,
} );

// --------------------------------------------------
// DECLARE TESTS: SETUP AND TEARDOWN
// --------------------------------------------------
test.before( () => {
	let {
		goalistDir,
		logsDirName,
		logName,
		logData,
	} = setupOpts;

	fs.mkdirSync( goalistDir );
	fs.mkdirSync( `${goalistDir}/${logsDirName}` );

	fs.writeFileSync( `${goalistDir}/${logsDirName}/${logName}`, JSON.stringify( logData ), 'utf8' );
} );

test.after.always( () => {
	del.sync( setupOpts.goalistDir );
} );

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test( 'Test `getGoalistDirName()`', ( t ) => {
	let dirName = utils.getGoalistDirName();

	t.is( dirName, path.parse( setupOpts.goalistDir ).name );
} );

test( 'Test `getGoalistDirPath()`', ( t ) => {
	let dirPath = utils.getGoalistDirPath();

	t.is( dirPath, setupOpts.goalistDir );
} );

test( 'Test `readGoalistDir()`', ( t ) => {
	let dir = utils.readGoalistDir();

	t.is( JSON.stringify( dir ), JSON.stringify( [ 'logs' ] ) );
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
	if ( d < 10 ) { d = ( '0' + d ).slice( 0, 2 ); }

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

test( 'Test `readTodayLog()`', ( t ) => {
	let log = utils.readTodayLog();

	t.is( log, null );
} );

test( 'Test `getLatestLogName()`', ( t ) => {
	let name = utils.getLatestLogName();

	t.is( name, setupOpts.logName );
} );

test( 'Test `getLatestLogPath()`', ( t ) => {
	let logPath = utils.getLatestLogPath();

	t.is( logPath, `${setupOpts.goalistDir}/${setupOpts.logsDirName}/${setupOpts.logName}` );
} );

test( 'Test `readLatestLog()`', ( t ) => {
	let logData = utils.readLatestLog();

	t.is( JSON.stringify( logData ), JSON.stringify(setupOpts.logData ) );
} );

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

test( 'Test `getLogPath()`', ( t ) => {
	let logPath = utils.getLogPath( '2001-01-01' );

	t.is( logPath, `${setupOpts.goalistDir}/${setupOpts.logsDirName}/goalist_2001-01-01.log` );
} );

test( 'Test `getLog()`', ( t ) => {
	let logData = utils.getLog( setupOpts.logIdentifier );

	t.is( JSON.stringify( logData ), JSON.stringify( setupOpts.logData ) );
} );

test( 'Test `getLogNames()`', ( t ) => {
	let logNames = utils.getLogNames();

	t.is( JSON.stringify( logNames ), JSON.stringify( [ setupOpts.logName ] ) );
} );

test( 'Test `readLog()`', ( t ) => {
	let logData = utils.readLog( `${setupOpts.goalistDir}/${setupOpts.logsDirName}/${setupOpts.logName}` );

	t.is( JSON.stringify( logData ), JSON.stringify( setupOpts.logData ) );
} );

test( 'Test `writeLog()`', ( t ) => {
	let result = utils.writeLog( `${setupOpts.goalistDir}/${setupOpts.logsDirName}/goalist_2001-01-01.log` );

	t.true( result );
} );

test( 'Test `getLogTemplate()`', ( t ) => {
	let template = utils.getLogTemplate();

	t.truthy( template );
} );

test( 'Test `getOrCreateGoalistDir()`',  ( t ) => {
	let dir = utils.getOrCreateGoalistDir();

	t.truthy( dir );
} );

test( 'Test `getOrCreateLogsDir()`', ( t ) => {
	let dir = utils.getOrCreateLogsDir();

	t.truthy( dir );
} );

test( 'Test `getOrCreateTodayLog()`', ( t ) => {
	let result = utils.getOrCreateTodayLog();

	t.is( result, undefined );
} );
