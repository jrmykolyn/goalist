// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: update } = require('../../dist/loggers/update');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
let goalist;
let log;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test.beforeEach(() => {
	log = sinon.spy();
	goalist = {
		config: {
			debugger: { log },
		},
	};
} );

test( 'it should print the message provided', ( t ) => {
  const msg = 'Foo';
  update( { msg }, goalist );

  t.is( log.calledWithExactly( msg ), true );
} );
