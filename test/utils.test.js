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

test.todo( 'Test `getLog()`' );

test.todo( 'Test `getLogPath()`' );

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

test( 'Test `getOrCreateLog()`', ( t ) => {
	let result = utils.getOrCreateLog();

	t.is( result, undefined );
} );
