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

function getTodayDirName() {
	var d = new Date();

	// NOTE: Take into account UTC offset when calculating 'today'.
	var today = new Date( d.getTime() - ( d.getTimezoneOffset() * 60 * 1000 ) );

	var todayDirName = `${today.getFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;

	return todayDirName;
}

function getTodayDirPath() {
	return `${getGoalistDirPath()}/${getTodayDirName()}`;
}

function getTodayDir() {
	return fs.readdirSync( getTodayDirPath(), 'utf8' );
}

function getTodayLogName() {
	return `goalist_${getTodayDirName()}.log`;
}

function getTodayLogPath() {
	return `${getTodayDirPath()}/${getTodayLogName()}`;
}

function getTodayLog() {
	return fs.readFileSync( getTodayLogPath(), 'utf8' );
}

function getYesterdayDirName() {
	var yesterday = moment().subtract( 1, 'days' );

	return `${yesterday.year()}-${yesterday.month() + 1}-${yesterday.date()}`;
}

function getYesterdayDirPath() {
	return `${getGoalistDirPath()}/${getYesterdayDirName()}`;
}

function getYesterdayDir() {
	return fs.readdirSync( getYesterdayDirPath(), 'utf8' );
}

function getYesterdayLogName() {
	return `goalist_${getYesterdayDirName()}.log`;
}

function getYesterdayLogPath() {
	return `${getYesterdayDirPath()}/${getYesterdayLogName()}`;
}

function getYesterdayLog() {
	try {
		return fs.readFileSync( getYesterdayLogPath(), 'utf8' );
	} catch ( err ) {
		return null;
	}
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
	getGoalistDirName,
	getGoalistDirPath,
	getGoalistDir,
	getTodayDirName,
	getTodayDirPath,
	getTodayDir,
	getTodayLogName,
	getTodayLogPath,
	getTodayLog,
	getYesterdayDirName,
	getYesterdayDirPath,
	getYesterdayDir,
	getYesterdayLogName,
	getYesterdayLogPath,
	getYesterdayLog,
};
