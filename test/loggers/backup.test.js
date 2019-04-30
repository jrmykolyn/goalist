// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: backup } = require('../../dist/loggers/backup');

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
	backup( { msg }, goalist );

	t.is( log.calledWithExactly( msg ), true );
} );
