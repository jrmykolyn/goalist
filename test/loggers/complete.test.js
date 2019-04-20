// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: complete } = require('../../dist/loggers/complete');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
let id;
let goal;
let goalist;
let log;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test.beforeEach(() => {
	id = 1;
	log = sinon.spy();
	goal = { id };
	goalist = {
		config: {
			debugger: { log },
		},
	};
} );

test( 'it should print a "goal complete"-type message', ( t ) => {
  complete( Object.assign({}, goal, { complete: true }), goalist );

  t.is( log.args[0][0].includes( id ), true );
} );

test( 'it should print a "goal incomplete"-type message', ( t ) => {
  complete( Object.assign({}, goal, { complete: false }), goalist );

  t.is( log.args[0][0].includes( id ), true );
} );

test( 'it should not print a message if the `complete` data point is a non-boolean value', ( t ) => {
  complete( Object.assign({}, goal, { complete: 'foo' } ), goalist );

  t.is( log.called, false );
});
