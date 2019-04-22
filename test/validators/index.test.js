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
test( 'It should return a Promise', ( t ) => {
  t.is( hasValidTitle(['foo'], {}, {}) instanceof Promise, true );
} );

test( 'It should resolve if a valid title is provided', ( t ) => {
  return hasValidTitle( ['foo'], {}, {} )
    .then( () => t.pass() )
    .catch( () => t.fail() );
} );

test( 'It should reject if an invalid title is provided', ( t ) => {
  return hasValidTitle( [''], {}, {} )
    .then( () => t.fail() )
    .catch( () => t.pass() );
} );
