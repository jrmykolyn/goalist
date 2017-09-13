#! /usr/bin/env node

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const os = require( 'os' );

// Vendor
const parseArgs = require( 'minimist' );

// Project
const commands = require( './lib' );
const utils = require( './utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var COMMAND = process.argv.slice( 2, 3 );
var ARGS = parseArgs( process.argv.slice( 2 ) );

var logTemplate = fs.readFileSync( `${__dirname}/data/goalist.log` );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function init( ARGS ) {
	// Ensure that `gl` is invoked with at least 1x arg.
	if ( !ARGS._[ 0 ] ) {
		console.log( 'Whoops, `goalist` must be executed with a valid command.' );
		return;
	}

	var goalistDirData;
	var todayDirData;
	var todayLogData;

	// Create `goalist` directory if it doesn't exist.
	try {
		goalistDirData =  fs.readdirSync( `${utils.getGoalistDirPath()}` );
	} catch ( err ) {
		fs.mkdirSync( `${utils.getGoalistDirPath()}` );
	}

	// Create directory for current day if it doesn't exist.
	try {
		todayDirData = fs.readdirSync( `${utils.getTodayDirPath()}` );
	} catch ( err ) {
		fs.mkdirSync( `${utils.getTodayDirPath()}` );
	}

	// Create log file for current day if it doesn't exist.
	try {
		todayLogData = fs.readFileSync( `${utils.getTodayLogPath()}`, 'utf8' );
	} catch ( err ) {
		fs.writeFileSync( `${utils.getTodayLogPath()}`, logTemplate, 'utf8' );
	}

	// Invoke `COMMAND` if failed, log error message otherwise.
	 if ( COMMAND in commands ) {
		 commands[ COMMAND ]( ARGS )
			 .then(
				 ( data ) => {
					 // DO THE NEEDFUL;
				 }
			 )
			 .catch(
				 ( err ) => {

				 }
			 );
	} else {
		console.log( 'Whoops, `goalist` was invoked with an invalid command.' );
		return;
	}
}

// --------------------------------------------------
// INITIALIZATION
// --------------------------------------------------
init( ARGS );
