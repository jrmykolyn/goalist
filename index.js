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

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function init( ARGS ) {
	// Ensure that `gl` is invoked with at least 1x arg.
	if ( !ARGS._[ 0 ] ) {
		console.log( 'Whoops, `goalist` must be executed with a valid command.' );
		return;
	}

	/// TODO: Consider building out wrapper function around `getOrCreate*()` methods.
	let goalistDirData = utils.getOrCreateGoalistDir();
	let logsDirData = utils.getOrCreateLogsDir();
	let todayLogData = utils.getOrCreateTodayLog();

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
