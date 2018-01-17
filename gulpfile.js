// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const gulp = require( 'gulp' );
const ts = require( 'gulp-typescript' );
const tsLint = require( 'gulp-tslint' );

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
gulp.task( 'default', [ 'ts' ], function() {
	console.log( 'INSIDE TASK: `default`' );
} );

/**
 * Wrapper around any/all TypeScript-related tasks.
 */
gulp.task( 'ts', [ 'ts:lint', 'ts:transpile' ] );

gulp.task( 'ts:lint', function() {
	return gulp.src( 'src/**/*.ts' )
		.pipe( tsLint( {
			configuration: 'tslint.json',
		} ) )
		.pipe( tsLint.report( {
			summarizeFailureOutput: true,
		} ) );
} );

gulp.task( 'ts:transpile', function() {
	let result = tsProject.src()
		.pipe( tsProject() );

	result.js.pipe( gulp.dest( './dist' ) );
} );
