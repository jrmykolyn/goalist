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
const goalist = require( './lib' );
const utils = require( './utils' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var COMMAND = process.argv.slice( 2, 3 );
var ARGS = parseArgs( process.argv.slice( 2 ) );

/// TODO: Move into appropriate method/remove.
var logTemplate = JSON.parse( fs.readFileSync( `${__dirname}/data/goalist.log` ) );

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
	var todayLogData;

	/// TODO: Move into dedicated `getOrCreateGoalistDir()`.
	// Create `goalist` directory if it doesn't exist.
	try {
		goalistDirData =  fs.readdirSync( `${utils.getGoalistDirPath()}` );
	} catch ( err ) {
		fs.mkdirSync( `${utils.getGoalistDirPath()}` );
	}

	/// TODO: Move into dedicated `getOrCreateLogsDir()`.
	// Create `logs` directory if it doesn't exist.
	try {
		logsDir = fs.readdirSync( `${utils.getDirPath()}` );
	} catch ( err ) {
		fs.mkdirSync( `${utils.getDirPath()}` );
	}

	/// TODO: Move into dedicated `getOrCreateTodayLog()`.
	// Create log file for current day if it doesn't exist.
	try {
		todayLogData = fs.readFileSync( `${utils.getTodayLogPath()}`, 'utf8' );
	} catch ( err ) {
		// Fetch latest log data.
		var latestLog = utils.readLatestLog();
		var latestGoals = ( latestLog && latestLog.goals ) ? latestLog.goals : {};

		// Remove any goals which are not 'incomplete'.
		for ( let key in latestGoals ) {
			let goal = latestGoals[ key ];

			if ( goal.status !== 'incomplete' ) {
				delete latestGoals[ key ];
			}
		}

		// Update template with additional 'goals'.
		logTemplate.goals = Object.assign( logTemplate.goals, latestGoals );

		// Write data to file system.
		fs.writeFileSync( `${utils.getTodayLogPath()}`, JSON.stringify( logTemplate ), 'utf8' );
	}

	// Invoke `COMMAND` if it's valid, log error message otherwise.
	 if ( COMMAND in goalist.commands ) {
		 goalist.commands[ COMMAND ]( ARGS )
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
