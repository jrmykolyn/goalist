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
const Goalist = require( './dist' );


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var COMMAND = process.argv.slice( 2, 3 );
var ARGS = parseArgs( process.argv.slice( 2 ) );

var goalist = new Goalist( [ COMMAND, ARGS ] );


// --------------------------------------------------
// INITIALIZATION
// --------------------------------------------------
goalist
	.preflight()
	.then( () => {
		return goalist.run();
	} )
	.then(
		( data ) => {
			/// TODO
		},
		( err ) => {
			/// TODO
		}
	);
