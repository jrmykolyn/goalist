// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: archive } = require('../../dist/loggers/archive');

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

test( 'it should print an "activating goal"-type message', ( t ) => {
  archive( Object.assign({}, goal, { active: true }), goalist );

  t.is( log.args[0][0].includes( id ), true );
} );

test( 'it should print an "deactivating goal"-type message', ( t ) => {
  archive( Object.assign({}, goal, { active: false }), goalist );

  t.is( log.args[0][0].includes( id ), true );
} );

test( 'it should not print a message if the `active` data point is a non-boolean value', ( t ) => {
  archive( Object.assign({}, goal, { active: 'foo' } ), goalist );

  t.is( log.called, false );
});
