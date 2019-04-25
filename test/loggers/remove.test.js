// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: remove } = require('../../dist/loggers/remove');

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

test( 'it should print a message containing the ID of the goal', ( t ) => {
	remove( goal, goalist );

	t.is( log.args[0][0].includes( id ), true );
} );
