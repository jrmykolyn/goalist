#! /usr/bin/env node

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );
const os = require( 'os' );

// Vendor
const meow = require( 'meow' );

// Project
const Goalist = require( './dist' );
const loggers = require('./dist/loggers');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var cli = meow( `
	USAGE:

		$ gl {{ COMMAND }} {{ ARGS }}

	COMMANDS:

		add / a - Add a new goal.
		archive / ar - Archive a goal.
		backup / b - Create a timestamped backup of the logs file(s).
		complete / c - Set a goal's status to complete.
		list / l - List goals.
		progress / p - Display complete/incomplete goals as a bar chart.
		remove / r - Remove a goal.
		update / u - Update the properties of a goal.
` );

var COMMAND = cli.input.slice( 0, 1 )[ 0 ];
var INPUT = cli.input.slice( 1 );
var ARGS = cli.flags;

var goalist = new Goalist( {
	cli: true,
	debuggerOpts: {
		mode: ( ARGS.silent ? 'silent' : ARGS.verbose ? 'verbose' : 'normal' ),
	},
} );

// --------------------------------------------------
// INITIALIZATION
// --------------------------------------------------
goalist.run( COMMAND, INPUT, ARGS )
	.then( ( data ) => {
		if (COMMAND in loggers) loggers[COMMAND](data, goalist);
		goalist.config.debugger.log(`Successfully executed command: ${COMMAND}`);
	} )
	.catch( ( err ) => {
		cli.showHelp();
	} );
