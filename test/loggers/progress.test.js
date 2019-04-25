// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const test = require('ava');
const sinon = require('sinon');

// Project
const { default: progress } = require('../../dist/loggers/progress');

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
let barHorizontal;
let data;
let goalist;
let log;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
test.beforeEach(() => {
	data = { total: 1, complete: 1, incomplete: 0 };
	barHorizontal = sinon.spy();
	log = sinon.spy();
	goalist = {
		config: {
			debugger: {
				log,
				getMode: () => null,
			},
			utils: { barHorizontal },
		},
	};
} );

test( 'It should display a selection of goal data', ( t ) => {
	progress( data, goalist );

	t.is( log.callCount, 4);
	t.is( log.args[0][0].includes( 'OVERVIEW' ), true );
	t.is( log.args[1][0].includes( '1' ), true );
	t.is( log.args[2][0].includes( '1' ), true );
	t.is( log.args[3][0].includes( '0' ), true );
} );

test( 'It should visualize the goal progress as a bar chart when in CLI mode', ( t ) => {
	progress( data, goalist );

	t.is( barHorizontal.calledWithExactly( { 'Complete': 1, 'Incomplete': 0 }, { labels: true } ), true );
} );

test( 'It should not visualize the goal progress if no data exists', ( t ) => {
	progress( {}, goalist );

	t.is( barHorizontal.callCount, 0 );
} );

