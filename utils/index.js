// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const os = require( 'os' );

// Vendor
const moment = require( 'moment' );

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function getGoalistDirName() {
	return '.goalist'; /// TODO
}

function getGoalistDirPath() {
	return `${os.homedir()}/${getGoalistDirName()}`;
}

function getGoalistDir() {
	return fs.readdirSync( getGoalistDirPath(), 'utf8' );
}

function getDirPath() {
	return `${getGoalistDirPath()}/logs`;
}

function getTodayHandle() {
	var d = new Date();

	// NOTE: Take into account UTC offset when calculating 'today'.
	var today = new Date( d.getTime() - ( d.getTimezoneOffset() * 60 * 1000 ) );

	var year = today.getFullYear();
	var month = ( today.getUTCMonth() + 1 );
	var day = today.getUTCDate();

	// Ensure that `month` identifier is always two characters (eg. '09'). Required for sorting purposes.
	month = ( month >= 10 ) ? month : '0' + month;

	var todayDirName = `${year}-${month}-${day}`;

	return todayDirName;
}

function getTodayLogName() {
	return `goalist_${getTodayHandle()}.log`;
}

function getTodayLogPath() {
	return `${getDirPath()}/${getTodayLogName()}`;
}

function getTodayLog() {
	try {
		return readLog( getTodayLogPath() );
	} catch ( err ) {
		console.log( 'Whoops, unable to get log file for current day!' );

		/// TODO[@jrmykolyn]: Consider only logging error message if program is running in 'verbose' mode.
		console.log( err.message );

		return null;
	}
}

function getLatestLogName() {
	try {
		let logs = getLogs();

		if ( !logs || !Array.isArray( logs ) || !logs.length ) {
			throw new Error( 'Failed to fetch log files.' );
		}

		let latestLog = logs.filter( ( log ) => {
			return log.substring( 0, 1 ) !== '.'; /// TODO[@jrmykolyn]: Filter by regex/pattern match.
		} )
		.sort()
		.reverse()[ 0 ];

		if ( !latestLog ) {
			throw new Error( 'Failed to extract latest log file from collection' );
		}

		return latestLog;
	} catch ( err ) {
		return null;
	}
}

function getLatestLogPath() {
	let dirPath = getDirPath();
	let latestLog = getLatestLogName();

	return ( dirPath && latestLog ) ? `${dirPath}/${latestLog}` : null;
}

function getLatestLog() {
	try {
		return readLog( getLatestLogPath() );
	} catch ( err ) {
		return null;
	}
}

function getLogName( identifier ) {
	identifier = ( identifier && typeof identifier === 'string' ) ? identifier : null;

	if ( !identifier ) {
		/// TODO
		console.log( 'Received invalid argument for `identifier`' );
		return null;
	}

	return `goalist_${identifier}.log`;
}

function getLogPath( identifier ) {
	let logName = getLogName( identifier );
	let dirPath = getDirPath( identifier );

	return ( logName && dirPath ) ? `${dirPath}/${logName}` : null;
}

function getLog( identifier ) {
	try {
		return readLog( getLogPath( identifier ) );
	} catch ( err ) {
		return null;
	}
}

function getLogs() {
 	try {
		return fs.readdirSync( getDirPath(), 'utf8' );
 	} catch ( err ) {
		return null;
 	}
}

function readLog( path, options ) {
	path = ( path && typeof path === 'string' ) ? path : null;
	options = ( options && typeof options === 'object' ) ? options : {};

	if ( !path ) {
		console.log( 'Received invalid argument for `path`' ); /// TEMP
		return;
	}

	try {
		return JSON.parse( fs.readFileSync( path ), 'utf8' ); /// TEMP
	} catch ( err ) {
		console.log( err.message );
		return null;
	}
}

function writeLog( target, data, options ) {
	target = ( target && typeof target === 'string' ) ? target : null;
	data = ( typeof data !== 'undefined' && data !== null ) ? data : null;
	options = ( options && typeof options === 'object' ) ? options : {};

	let resolvedPath = ( target === 'today' ) ? getTodayLogPath() : null;

	if ( !resolvedPath ) {
		console.log( 'Whoops, `writeLog()` ony accepts the following value(s) for the `path` argument: "today"' ); /// TEMP
		return;
	}

	try {
		fs.writeFileSync( resolvedPath, data, 'utf8' );

		return true;
	} catch ( err ) {
		return false;
	}
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
	getGoalistDirName,
	getGoalistDirPath,
	getGoalistDir,
	getDirPath,
	getTodayHandle,
	getTodayLogName,
	getTodayLogPath,
	getTodayLog,
	getLatestLogName,
	getLatestLogPath,
	getLatestLog,
	getLogName,
	getLogPath,
	getLog,
	getLogs,
	readLog,
	writeLog,
};
