// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const test = require( 'ava' );

// Project
const pkg = require( '../package' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// NOTE: Make sure that import path is relative to process dir. (eg. root).
let importPath = `${process.cwd()}/${pkg.main}`;

// --------------------------------------------------
// DECLARE TESTS: SETUP AND TEARDOWN
// --------------------------------------------------

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test( 'Is importable.', ( t ) => {
	try {
		const Goalist = require( importPath );

		t.pass();
	} catch ( err ) {
		t.fail();
	}
} );

test( 'Is a function.', ( t ) => {
	const Goalist = require( importPath );

	t.is( typeof Goalist, 'function' );
} );

test( 'Can be instantiated.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	t.is( goalist instanceof Goalist, true );
} );

test( 'Exposes the `run()` instance method.', ( t ) => {
	const Goalist = require( importPath );

	let goalist = new Goalist();

	t.is( typeof goalist.run, 'function' );
} );
