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
const tsProject = ts.createProject( 'tsconfig.json' );

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
	console.log( 'INSIDE TASK: `typescript`' );

	let result = tsProject.src()
		.pipe( tsProject() );

	result.js.pipe( gulp.dest( './dist' ) );
} );
