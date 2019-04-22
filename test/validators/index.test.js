// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { hasValidTitle } = require('../../dist/validators');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test( 'It should return `undefined` if a valid title is provided', ( t ) => {
  t.is( hasValidTitle( [ 'foo' ], {}, {} ), undefined );
} );

test( 'It should throw an error if an invalid title is provided', ( t ) => {
  t.throws( () => hasValidTitle( [], {}, {} ) );
} );
