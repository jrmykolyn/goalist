// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const os = require( 'os' );

// Vendor

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
	var today = new Date();
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
};
