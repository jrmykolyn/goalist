// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { hasValidInput } = require('../../dist/validators');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test( 'It should return a function', ( t ) => {
	t.is( typeof hasValidInput(), 'function' );
} );

test( 'It should return `undefined` if valid input is provided', ( t ) => {
	t.is( hasValidInput()( [ 'foo' ], {}, {} ), undefined );
} );

test( 'It should throw an error if invalid input is provided', ( t ) => {
	t.throws( () => hasValidInput()( [], {}, {} ) );
} );

test( 'It should use the error message provided', ( t ) => {
	const msg = 'Foo';
	try {
		hasValidInput( { msg } )( [], {}, {} );
	} catch ( err ) {
		t.is( err.message, msg );
	}
} );
