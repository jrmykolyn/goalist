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


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var COMMAND = process.argv.slice( 2, 3 );
var ARGS = parseArgs( process.argv.slice( 2 ) );


// --------------------------------------------------
// INITIALIZATION
// --------------------------------------------------
goalist
	.preflight( [ COMMAND, ARGS ] )
	.then( goalist.run )
	.then(
		( data ) => {
			/// TODO
		},
		( err ) => {
			/// TODO
		}
	);
