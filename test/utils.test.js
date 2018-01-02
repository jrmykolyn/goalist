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


test( 'Test `getActiveLogName()`', ( t ) => {
	let activeLogName = utils.getActiveLogName();

	t.is( activeLogName, 'goalist_active.log' );
} );

test( 'Test `getActiveLogPath()`', ( t ) => {
	let activeLogPath = utils.getActiveLogPath();

	t.is( activeLogPath, `${utils.getDirPath()}/${utils.getActiveLogName()}` );
} );

test( 'Test `readActiveLog()`', ( t ) => {
	let log = utils.readActiveLog();

	t.is( log, null );
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

test( 'Test `getOrCreateActiveLog()`', ( t ) => {
	let result = utils.getOrCreateActiveLog();

	t.is( result, undefined );
} );
