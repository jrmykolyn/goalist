// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const gulp = require( 'gulp' );
const ts = require( 'gulp-typescript' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
/**
 * Wrapper around any/all tasks to be executed when `gulp` is run.
 */
gulp.task( 'default', [ 'typescript' ], function() {
	console.log( 'INSIDE TASK: `default`' );
} );

/**
 * Wrapper around any/all TypeScript-related tasks.
 */
gulp.task( 'typescript', function() {
	console.log( 'INSIDE TASK: `scripts`' );
	gulp.src( './src/**/*.ts' )
		.pipe( ts() )
		.pipe( gulp.dest( `${__dirname}/lib` ) );
} );
